import useAuthStore from '../store/useAuthStore';
import useStore from '../store/useStore';

export default function AuthButton() {
  const { user, syncing, signIn, signOut, loadFromCloud, saveToCloud } = useAuthStore();
  const { progress, scrappedQuestions, wrongQuestions } = useStore();

  const handleSignIn = () => {
    signIn(async (u) => {
      // 로그인 후: 클라우드 데이터와 로컬 데이터 비교
      const remote = await loadFromCloud(u.uid);
      const localCount = Object.keys(progress).length;
      const remoteCount = remote ? Object.keys(remote.progress || {}).length : 0;

      if (remote && remoteCount >= localCount) {
        // 클라우드가 더 많은 데이터 → 로컬에 덮어쓰기
        useStore.setState({
          progress: remote.progress || {},
          scrappedQuestions: remote.scrappedQuestions || [],
          wrongQuestions: remote.wrongQuestions || [],
        });
      } else {
        // 로컬이 더 많은 데이터 → 클라우드에 업로드
        await saveToCloud(u.uid, { progress, scrappedQuestions, wrongQuestions });
      }
    });
  };

  if (syncing) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-sky-500 font-medium px-3 py-1.5 bg-sky-50 rounded-full">
        <span className="w-3 h-3 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
        동기화 중
      </div>
    );
  }

  if (user) {
    return (
      <button
        onClick={signOut}
        className="flex items-center gap-2 text-xs text-slate-500 px-3 py-1.5 bg-slate-100 rounded-full active:bg-slate-200 transition-colors"
      >
        {user.photoURL && (
          <img src={user.photoURL} alt="" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
        )}
        <span className="max-w-[80px] truncate">{user.displayName || '사용자'}</span>
        <span className="text-slate-400">·</span>
        <span>로그아웃</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="flex items-center gap-1.5 text-xs font-medium text-white px-3 py-1.5 bg-sky-500 rounded-full active:bg-sky-600 transition-colors"
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
        <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064 5.97 5.97 0 014.101 1.62l2.856-2.855A10.017 10.017 0 0012.545 2C6.714 2 2 6.477 2 12s4.714 10 10.545 10c8.61 0 10.682-8.065 9.822-11.761H12.545z"/>
      </svg>
      Google로 동기화
    </button>
  );
}
