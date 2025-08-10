import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export default function useUserProducts() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!currentUser?.username) {
      setProducts([]);
      return;
    }

    const productsQuery = query(
      collection(db, "products"),
      where("username", "==", currentUser.username)
    );

    const unsubscribe = onSnapshot(
      productsQuery,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        items.sort((a, b) => (a.order || 0) - (b.order || 0));
        const publishedItems = items.filter((item) => item.published !== false);
        setProducts(publishedItems);
      },
      (error) => {
        console.error("Realtime fetch lỗi:", error);
      }
    );

    return () => unsubscribe();
  }, [currentUser?.username]);

  return { currentUser, products };
}
