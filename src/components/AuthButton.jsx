import useAuthStore from '../store/useAuthStore';
import useStore from '../store/useStore';

export default function AuthButton() {
  const { user, syncing, signIn, signOut, loadFromCloud, saveToCloud } = useAuthStore();
  const { progress, scrappedQuestions, wrongQuestions } = useStore();

  const handleSignIn = () => {
    signIn(async (u) => {
      const remote = await loadFromCloud(u.uid);
      const localCount = Object.keys(progress).length;
      const remoteCount = remote ? Object.keys(remote.progress || {}).length : 0;
      if (remote && remoteCount >= localCount) {
        useStore.setState({
          progress: remote.progress || {},
          scrappedQuestions: remote.scrappedQuestions || [],
          wrongQuestions: remote.wrongQuestions || [],
        });
      } else {
        await saveToCloud(u.uid, { progress, scrappedQuestions, wrongQuestions });
      }
    });
  };

  if (syncing) {
    return (
      <div className="w-8 h-8 flex items-center justify-center">
        <span className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <button
        onClick={signOut}
        className="w-8 h-8 rounded-full overflow-hidden border-2 border-sky-300 active:opacity-70"
        title={`${user.displayName} · 로그아웃`}
      >
        {user.photoURL
          ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          : <div className="w-full h-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold">
              {(user.displayName || 'U')[0]}
            </div>
        }
      </button>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm active:scale-90 transition-transform"
      title="Google로 동기화"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    </button>
  );
}
