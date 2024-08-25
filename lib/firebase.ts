'use client';

// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { GameTheme } from '@/types/GameTheme';
import { Leaderboard } from '@/types/Leaderboard';
import { UserInfo } from '@/types/UserInfo';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export const getUserInfo = async (
  id: string,
  theme: GameTheme,
): Promise<UserInfo | undefined> => {
  const docRef = doc(db, 'players', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const netData = docSnap.data();
    const themeData = netData[theme];
    return {
      id,
      username: netData.username,
      bestLevel: themeData.level,
      bestScore: themeData.score,
    };
  }
};

export const createUser = async (username: string, theme: GameTheme) => {
  try {
    // 建立玩家資料
    const res = await addDoc(collection(db, 'players'), {
      username: username,
      color: {
        level: 1,
        score: 0,
      },
    });
    const userData = await getUserInfo(res.id, theme);
    return userData;
  } catch (e) {
    console.error('Error adding document: ', e);
    return '';
  }
};

export const editUsername = async (id: string, newName: string) => {
  try {
    const userRef = doc(db, 'players', id);
    await updateDoc(userRef, {
      username: newName,
    });
  } catch (e) {
    console.error('Error updating document: ', e);
  }
};

export const addUserInLeaderboard = async (
  id: string,
  score: number,
  level: number,
  theme: GameTheme,
) => {
  try {
    const userRef = doc(db, 'players', id);
    await updateDoc(userRef, {
      [theme]: { level, score },
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getLeaderboard = async (theme: GameTheme) => {
  const querySnapshot = await getDocs(
    query(collection(db, 'players'), orderBy('color.score', 'desc'), limit(50)),
  );
  const leaderboard: Leaderboard[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();
    if (data[theme].score > 0) {
      const board: Leaderboard = {
        id: doc.id,
        username: data.username,
        score: data[theme].score,
      };
      leaderboard.push(board);
    }
  });

  return leaderboard;
};

export const getRankByScore = async (score: number) => {
  const querySnapshot = await getDocs(
    query(collection(db, 'players'), where('color.score', '>', score)),
  );

  const rank = querySnapshot.size + 1;
  return rank;
};
