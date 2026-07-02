import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardScreen from './screens/DashboardScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import TheoryScreen from './screens/TheoryScreen';
import ReviewScreen from './screens/ReviewScreen';
import ExamScreen from './screens/ExamScreen';
import ExamResultScreen from './screens/ExamResultScreen';

export default function App() {
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
          <Route path="/exam" element={<ExamScreen />} />
          <Route path="/exam/result" element={<ExamResultScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
