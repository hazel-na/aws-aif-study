import { create } from 'zustand';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';

const useAuthStore = create((set, get) => ({
  user: null,        // Firebase user object
  syncing: false,    // 동기화 중 여부
  initialized: false, // auth 초기화 완료 여부

  // Firebase auth 상태 감지 초기화 (앱 시작 시 1회 호출)
  init: (onUserLoaded) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      set({ user, initialized: true });
      if (user && onUserLoaded) {
        await onUserLoaded(user);
      }
    });
    return unsubscribe;
  },

  // Google 로그인
  signIn: async (onSuccess) => {
    try {
      set({ syncing: true });
      const result = await signInWithPopup(auth, googleProvider);
      if (onSuccess) await onSuccess(result.user);
    } catch (e) {
      console.error('로그인 오류:', e);
    } finally {
      set({ syncing: false });
    }
  },

  // 로그아웃
  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null });
  },

  // Firestore에서 데이터 불러오기
  loadFromCloud: async (uid) => {
    try {
      const ref = doc(db, 'users', uid, 'data', 'state');
      const snap = await getDoc(ref);
      if (snap.exists()) return snap.data();
      return null;
    } catch (e) {
      console.error('클라우드 로드 오류:', e);
      return null;
    }
  },

  // Firestore에 데이터 저장
  saveToCloud: async (uid, data) => {
    try {
      const ref = doc(db, 'users', uid, 'data', 'state');
      await setDoc(ref, {
        ...data,
        updatedAt: Date.now(),
      });
    } catch (e) {
      console.error('클라우드 저장 오류:', e);
    }
  },
}));

export default useAuthStore;
