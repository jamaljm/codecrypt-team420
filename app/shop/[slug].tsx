import React, { use } from "react";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { database, storage } from "../../firebase";
import { useAuth } from "../../Authcontext";
import toast, { Toaster } from "react-hot-toast";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/router";

type Shop = {
  shop_name: string;
  shop_id: string;
  shop_type: string;
  shop_email: string;
  shop_logo: string;
  shop_product: string;
};

export default function shop() {
  const router = useRouter();
  console.log(router.query.slug);
  const slug = router.query.slug;
  const [shops, setShops] = useState<Shop[]>([]);

  const [items, setItems] = useState<any[]>([]);

  const addVal1 = async () => {
    const q = query(collection(database, "shop"), where("shop_id", "==", slug));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((event) => {
      // console.log(event.id, " => ", event.data());
    });
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as Shop),
    }));
    setShops(filteredData);
  };
  const addVal2 = async () => {
    const q = query(
      collection(database, "items"),
      where("shop_id", "==", slug)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((event) => {
      // console.log(event.id, " => ", event.data());
    });
    const filteredData = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as any),
    }));
    setItems(filteredData);
  };
  useEffect(() => {
    addVal1();
    addVal2();
  }, []);

  return <div></div>;
}
