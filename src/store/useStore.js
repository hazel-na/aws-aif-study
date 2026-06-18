import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import allQuestions from '../data/questions.json';

// Firestore 동기화 디바운서 (1초 debounce)
let syncTimer = null;
function scheduleSyncToCloud(state) {
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(async () => {
    try {
      const { default: useAuthStore } = await import('./useAuthStore');
      const { user, saveToCloud } = useAuthStore.getState();
      if (!user) return;
      const { progress, scrappedQuestions, wrongQuestions } = state;
      await saveToCloud(user.uid, { progress, scrappedQuestions, wrongQuestions });
    } catch (e) {
      // Firebase 미설정 시 무시
    }
  }, 1000);
}

const TOTAL = allQuestions.length; // 329

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const useStore = create(
  persist(
    (set, get) => ({
      // ── 영속 상태
      progress: {},           // { [id]: { userAnswer, isCorrect, answeredAt } }
      scrappedQuestions: [],  // [id, ...]
      wrongQuestions: [],     // [id, ...]
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

      // ── 세션 시작
      startSession: (mode = 'all') => {
        const { wrongQuestions, scrappedQuestions, settings } = get();
        let ids;
        if (mode === 'wrong') {
          ids = wrongQuestions.length > 0
            ? [...wrongQuestions]
            : allQuestions.map(q => q.id);
        } else if (mode === 'scrapped') {
          ids = scrappedQuestions.length > 0
            ? [...scrappedQuestions]
            : allQuestions.map(q => q.id);
        } else {
          ids = allQuestions.map(q => q.id);
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

        const isHotspot = question.isHotspot || question.correctAnswer === 'HOTSPOT';
        const isCorrect = isHotspot ? false : userAnswer === question.correctAnswer;

        const { progress, wrongQuestions } = get();

        // 진도 기록
        const newProgress = {
          ...progress,
          [questionId]: { userAnswer, isCorrect, answeredAt: Date.now() },
        };

        // 오답 관리
        let newWrong = [...wrongQuestions];
        if (!isCorrect && !isHotspot) {
          if (!newWrong.includes(questionId)) newWrong.push(questionId);
        } else if (isCorrect) {
          newWrong = newWrong.filter(id => id !== questionId);
        }

        set({ progress: newProgress, wrongQuestions: newWrong });
        scheduleSyncToCloud({ progress: newProgress, scrappedQuestions: get().scrappedQuestions, wrongQuestions: newWrong });
        return isCorrect;
      },

      // ── 스크랩 토글
      toggleScrapped: (questionId) => {
        const { scrappedQuestions, progress, wrongQuestions } = get();
        const isScrap = scrappedQuestions.includes(questionId);
        const newScrapped = isScrap
          ? scrappedQuestions.filter(id => id !== questionId)
          : [...scrappedQuestions, questionId];
        set({ scrappedQuestions: newScrapped });
        scheduleSyncToCloud({ progress, scrappedQuestions: newScrapped, wrongQuestions });
      },

      // ── 설정 변경
      updateSettings: (patch) => {
        set({ settings: { ...get().settings, ...patch } });
      },

      // ── 전체 초기화
      resetAll: () => set({
        progress: {},
        scrappedQuestions: [],
        wrongQuestions: [],
        currentSession: null,
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
    }),
    {
      name: 'aif_app_state',
      partialize: (state) => ({
        progress: state.progress,
        scrappedQuestions: state.scrappedQuestions,
        wrongQuestions: state.wrongQuestions,
        settings: state.settings,
        currentSession: state.currentSession,
      }),
    }
  )
);

export { allQuestions, TOTAL };
export default useStore;
