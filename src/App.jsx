import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardScreen from './screens/DashboardScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import TheoryScreen from './screens/TheoryScreen';
import ReviewScreen from './screens/ReviewScreen';
import useAuthStore from './store/useAuthStore';
import useStore from './store/useStore';

export default function App() {
  const { init, loadFromCloud, saveToCloud } = useAuthStore();
  const { progress, scrappedQuestions, wrongQuestions } = useStore();

  useEffect(() => {
    const unsubscribe = init(async (user) => {
      // 앱 시작 시 이미 로그인 상태라면 클라우드 데이터 로드
      const remote = await loadFromCloud(user.uid);
      const localCount = Object.keys(progress).length;
      const remoteCount = remote ? Object.keys(remote.progress || {}).length : 0;
      if (remote && remoteCount >= localCount) {
        useStore.setState({
          progress: remote.progress || {},
          scrappedQuestions: remote.scrappedQuestions || [],
          wrongQuestions: remote.wrongQuestions || [],
        });
      } else if (localCount > 0) {
        await saveToCloud(user.uid, { progress, scrappedQuestions, wrongQuestions });
      }
    });
    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto relative min-h-[100dvh] bg-sky-50 shadow-2xl overflow-hidden">
        <Routes>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/result" element={<ResultScreen />} />
          <Route path="/theory" element={<TheoryScreen />} />
          <Route path="/theory/:chapterId" element={<TheoryScreen />} />
          <Route path="/review" element={<ReviewScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
