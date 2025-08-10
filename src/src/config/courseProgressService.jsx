import {
  doc,
  setDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./firebase";

export async function fetchCompletedLessons(userId, courseId) {
  if (!userId || !courseId) return [];
  try {
    const docRef = doc(db, "users", userId, "courseProgress", courseId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data().completedLessons || [];
    }
  } catch (err) {
    console.error("Failed to fetch progress", err);
  }
  return [];
}

export async function markLessonCompleted(userId, courseId, lessonId) {
  if (!userId || !courseId || !lessonId) return;
  try {
    const docRef = doc(db, "users", userId, "courseProgress", courseId);
    await setDoc(
      docRef,
      {
        completedLessons: arrayUnion(String(lessonId)),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error("Failed to update progress", err);
  }
}
