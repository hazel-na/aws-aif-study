import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import allQuestions from '../data/questions.json';

const TOTAL = allQuestions.length; // 329 (유효 문제 319)

// 실제 시험 설정 (AWS AIF-C01: 65문항 / 90분)
const EXAM_QUESTION_COUNT = 65;
const EXAM_TIME_LIMIT = 90 * 60; // 초
const EXAM_PASS_SCORE = 70;      // %

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 답안 유형 판별
function getAnswerType(question) {
  return question.answerType
    || (question.correctAnswer === 'HOTSPOT' || question.correctAnswer === 'UNKNOWN' || question.isHotspot
      ? 'matching'
      : 'single');
}

// 정답 여부 채점 (단일/복수형만 채점 가능)
function checkCorrect(question, userAnswer) {
  if (!question || userAnswer == null) return false;
  const answerType = getAnswerType(question);
  if (answerType === 'matching' || answerType === 'ordering') return false;

  if (answerType === 'multi') {
    const correctKeys = question.correctAnswers
      || String(question.correctAnswer).split(/[,\s]+/).filter(Boolean);
    const userKeys = Array.isArray(userAnswer)
      ? userAnswer
      : String(userAnswer).split(/[,\s]+/).filter(Boolean);
    return correctKeys.length === userKeys.length
      && [...correctKeys].sort().join(',') === [...userKeys].sort().join(',');
  }
  return userAnswer === question.correctAnswer;
}

// 유효 문제(문제 텍스트 있음) id
function getValidIds() {
  return allQuestions
    .filter(q => {
      const ko = (q.koreanQuestion || '').trim();
      const en = (q.englishQuestion || '').trim();
      return ko.length > 5 || en.length > 5;
    })
    .map(q => q.id);
}

// 채점 가능한(단일/복수형) 유효 문제 id — 모의고사용
function getScorableIds() {
  const validSet = new Set(getValidIds());
  return allQuestions
    .filter(q => {
      if (!validSet.has(q.id)) return false;
      const t = getAnswerType(q);
      return (t === 'single' || t === 'multi') && Array.isArray(q.choices) && q.choices.length > 0;
    })
    .map(q => q.id);
}

const useStore = create(
  persist(
    (set, get) => ({
      // ── 영속 상태
      progress: {},           // { [id]: { userAnswer, isCorrect, answeredAt } }
      scrappedQuestions: [],  // [id, ...]
      wrongQuestions: [],     // [id, ...]
      bookmark: null,         // { mode, questionId, index, savedAt } — 책갈피
      settings: {
        randomOrder: false,
        showBilingual: true,  // 영문+한글 동시 표시
      },

      // ── 세션 상태 (localStorage 저장)
      currentSession: null,
      /* {
           mode: 'all' | 'wrong' | 'scrapped',
           sessionQuestionIds: [id, ...],
           currentIndex: number,
           startTime: number,
           timeLimit: number,  // 초 (99분 = 5940초)
         }
      */

      // ── 모의고사 세션
      examSession: null,
      /* {
           questionIds: [id, ...],
           answers: { [id]: userAnswer },
           currentIndex: number,
           startTime: number,
           timeLimit: number,  // 초
         }
      */
      examResult: null,
      /* { questionIds, answers, correct, total, wrong: [id], score, durationSec, submittedAt } */

      // ── 세션 시작
      startSession: (mode = 'all') => {
        const { wrongQuestions, scrappedQuestions, settings } = get();
        const validIds = getValidIds();

        let ids;
        if (mode === 'wrong') {
          ids = wrongQuestions.length > 0
            ? wrongQuestions.filter(id => validIds.includes(id))
            : validIds;
        } else if (mode === 'scrapped') {
          ids = scrappedQuestions.length > 0
            ? scrappedQuestions.filter(id => validIds.includes(id))
            : validIds;
        } else {
          ids = validIds;
        }

        if (settings.randomOrder) ids = shuffle(ids);

        set({
          currentSession: {
            mode,
            sessionQuestionIds: ids,
            currentIndex: 0,
            startTime: Date.now(),
            timeLimit: 5940, // 99분
          },
        });
      },

      // ── 특정 문제 id 목록으로 학습 세션 시작 (예: 모의고사 오답만 다시 풀기)
      startSessionWithIds: (ids, mode = 'wrong') => {
        const { settings } = get();
        const validIds = getValidIds();
        let list = ids.filter(id => validIds.includes(id));
        if (list.length === 0) return false;
        if (settings.randomOrder) list = shuffle(list);
        set({
          currentSession: {
            mode,
            sessionQuestionIds: list,
            currentIndex: 0,
            startTime: Date.now(),
            timeLimit: 5940,
          },
        });
        return true;
      },

      // ── 세션 재시작 (무한 루프)
      restartSession: () => {
        const session = get().currentSession;
        if (!session) return;
        const { settings } = get();
        const ids = settings.randomOrder
          ? shuffle([...session.sessionQuestionIds])
          : [...session.sessionQuestionIds];
        set({
          currentSession: {
            ...session,
            sessionQuestionIds: ids,
            currentIndex: 0,
            startTime: Date.now(),
          },
        });
      },

      // ── 세션 종료
      endSession: () => set({ currentSession: null }),

      // ── 특정 인덱스로 점프
      jumpToIndex: (index) => {
        const session = get().currentSession;
        if (!session) return;
        const clamped = Math.max(0, Math.min(index, session.sessionQuestionIds.length - 1));
        set({ currentSession: { ...session, currentIndex: clamped } });
      },

      // ── 다음/이전 문제
      nextQuestion: () => {
        const session = get().currentSession;
        if (!session) return;
        const nextIdx = session.currentIndex + 1;
        if (nextIdx >= session.sessionQuestionIds.length) {
          // 세션 끝 → 무한 루프
          get().restartSession();
        } else {
          set({ currentSession: { ...session, currentIndex: nextIdx } });
        }
      },

      prevQuestion: () => {
        const session = get().currentSession;
        if (!session) return;
        const prevIdx = Math.max(0, session.currentIndex - 1);
        set({ currentSession: { ...session, currentIndex: prevIdx } });
      },

      // ── 답 제출
      submitAnswer: (questionId, userAnswer) => {
        const question = allQuestions.find(q => q.id === questionId);
        if (!question) return;

        const answerType = getAnswerType(question);
        const isReveal = answerType === 'matching' || answerType === 'ordering';
        const isCorrect = isReveal ? false : checkCorrect(question, userAnswer);
        const isHotspot = isReveal;

        const { progress, wrongQuestions, scrappedQuestions } = get();

        // 진도 기록
        const newProgress = {
          ...progress,
          [questionId]: { userAnswer, isCorrect, answeredAt: Date.now() },
        };

        // 오답 관리
        let newWrong = [...wrongQuestions];
        let newScrapped = [...scrappedQuestions];
        if (!isCorrect && !isHotspot) {
          if (!newWrong.includes(questionId)) newWrong.push(questionId);
          // 틀린 문제 자동 스크랩
          if (!newScrapped.includes(questionId)) newScrapped.push(questionId);
        } else if (isCorrect) {
          newWrong = newWrong.filter(id => id !== questionId);
          // 정답 시 자동 스크랩 해제 (수동 스크랩은 유지 안 함)
        }

        set({ progress: newProgress, wrongQuestions: newWrong, scrappedQuestions: newScrapped });
        return isCorrect;
      },

      // ── 스크랩 토글
      toggleScrapped: (questionId) => {
        const { scrappedQuestions } = get();
        const isScrap = scrappedQuestions.includes(questionId);
        const newScrapped = isScrap
          ? scrappedQuestions.filter(id => id !== questionId)
          : [...scrappedQuestions, questionId];
        set({ scrappedQuestions: newScrapped });
      },

      // ── 책갈피: 현재 문제 위치 저장
      setBookmark: () => {
        const session = get().currentSession;
        if (!session) return;
        const questionId = session.sessionQuestionIds[session.currentIndex];
        set({
          bookmark: {
            mode: session.mode,
            questionId,
            index: session.currentIndex,
            savedAt: Date.now(),
          },
        });
      },

      // ── 책갈피 해제
      clearBookmark: () => set({ bookmark: null }),

      // ── 책갈피 이어풀기: 저장된 모드로 세션 시작 후 해당 문제로 이동
      resumeBookmark: () => {
        const { bookmark } = get();
        if (!bookmark) return;
        get().startSession(bookmark.mode || 'all');
        const session = get().currentSession;
        if (!session) return;
        let idx = session.sessionQuestionIds.indexOf(bookmark.questionId);
        if (idx < 0) idx = Math.min(bookmark.index || 0, session.sessionQuestionIds.length - 1);
        get().jumpToIndex(idx);
      },

      // ── 모의고사 시작
      startExam: () => {
        const pool = getScorableIds();
        const count = Math.min(EXAM_QUESTION_COUNT, pool.length);
        const questionIds = shuffle(pool).slice(0, count);
        set({
          examResult: null,
          examSession: {
            questionIds,
            answers: {},
            currentIndex: 0,
            startTime: Date.now(),
            timeLimit: EXAM_TIME_LIMIT,
          },
        });
      },

      // ── 모의고사 답안 선택 (채점 없이 저장만)
      setExamAnswer: (questionId, userAnswer) => {
        const exam = get().examSession;
        if (!exam) return;
        set({ examSession: { ...exam, answers: { ...exam.answers, [questionId]: userAnswer } } });
      },

      // ── 모의고사 문항 이동
      examJump: (index) => {
        const exam = get().examSession;
        if (!exam) return;
        const clamped = Math.max(0, Math.min(index, exam.questionIds.length - 1));
        set({ examSession: { ...exam, currentIndex: clamped } });
      },
      examNext: () => {
        const exam = get().examSession;
        if (!exam) return;
        const idx = Math.min(exam.currentIndex + 1, exam.questionIds.length - 1);
        set({ examSession: { ...exam, currentIndex: idx } });
      },
      examPrev: () => {
        const exam = get().examSession;
        if (!exam) return;
        const idx = Math.max(exam.currentIndex - 1, 0);
        set({ examSession: { ...exam, currentIndex: idx } });
      },

      // ── 모의고사 제출 & 채점
      finishExam: () => {
        const exam = get().examSession;
        if (!exam) return;
        const { progress, wrongQuestions, scrappedQuestions } = get();

        const newProgress = { ...progress };
        let newWrong = [...wrongQuestions];
        let newScrapped = [...scrappedQuestions];

        let correct = 0;
        const wrong = [];
        for (const qId of exam.questionIds) {
          const q = allQuestions.find(x => x.id === qId);
          const ua = exam.answers[qId];
          const ok = checkCorrect(q, ua);
          if (ok) {
            correct++;
            newWrong = newWrong.filter(id => id !== qId);
          } else {
            wrong.push(qId);
            if (!newWrong.includes(qId)) newWrong.push(qId);
            if (!newScrapped.includes(qId)) newScrapped.push(qId);
          }
          // 응답한 문제만 진도에 기록
          if (ua != null) {
            newProgress[qId] = { userAnswer: ua, isCorrect: ok, answeredAt: Date.now() };
          }
        }

        const total = exam.questionIds.length;
        const result = {
          questionIds: exam.questionIds,
          answers: exam.answers,
          correct,
          total,
          wrong,
          score: total > 0 ? Math.round((correct / total) * 100) : 0,
          passScore: EXAM_PASS_SCORE,
          durationSec: Math.floor((Date.now() - exam.startTime) / 1000),
          submittedAt: Date.now(),
        };

        set({
          examResult: result,
          examSession: null,
          progress: newProgress,
          wrongQuestions: newWrong,
          scrappedQuestions: newScrapped,
        });
        return result;
      },

      // ── 모의고사 종료(중단)
      endExam: () => set({ examSession: null }),

      // ── 설정 변경
      updateSettings: (patch) => {
        set({ settings: { ...get().settings, ...patch } });
      },

      // ── 전체 초기화
      resetAll: () => set({
        progress: {},
        scrappedQuestions: [],
        wrongQuestions: [],
        bookmark: null,
        currentSession: null,
        examSession: null,
        examResult: null,
      }),

      // ── 선택된 카테고리 진도
      getCategoryProgress: (category) => {
        const { progress } = get();
        const catQuestions = allQuestions.filter(q => q.category === category);
        const answered = catQuestions.filter(q => progress[q.id]);
        return {
          total: catQuestions.length,
          answered: answered.length,
          correct: answered.filter(q => progress[q.id]?.isCorrect).length,
        };
      },

      // ── 전체 진도
      getOverallProgress: () => {
        const { progress } = get();
        const answered = Object.keys(progress).length;
        const correct = Object.values(progress).filter(p => p.isCorrect).length;
        return { total: TOTAL, answered, correct };
      },

      // ── 현재 문제 가져오기
      getCurrentQuestion: () => {
        const session = get().currentSession;
        if (!session) return null;
        const qId = session.sessionQuestionIds[session.currentIndex];
        return allQuestions.find(q => q.id === qId) || null;
      },

      // ── 모의고사 현재 문제
      getCurrentExamQuestion: () => {
        const exam = get().examSession;
        if (!exam) return null;
        const qId = exam.questionIds[exam.currentIndex];
        return allQuestions.find(q => q.id === qId) || null;
      },
    }),
    {
      name: 'aif_app_state',
      partialize: (state) => ({
        progress: state.progress,
        scrappedQuestions: state.scrappedQuestions,
        wrongQuestions: state.wrongQuestions,
        bookmark: state.bookmark,
        settings: state.settings,
        currentSession: state.currentSession,
        examSession: state.examSession,
        examResult: state.examResult,
      }),
    }
  )
);

export { allQuestions, TOTAL, EXAM_QUESTION_COUNT, EXAM_TIME_LIMIT, EXAM_PASS_SCORE, checkCorrect, getAnswerType };
export default useStore;
