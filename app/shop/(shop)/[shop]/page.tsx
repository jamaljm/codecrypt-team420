"use client";
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
import { database, storage } from "../../../../firebase";
import { useAuth } from "../../../../Authcontext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";

import toast, { Toaster } from "react-hot-toast";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

type Shop = {
  shop_name: string;
  shop_id: string;
  shop_type: string;
  shop_email: string;
  shop_logo: string;
  shop_product: string;
};

interface PageProps {
  params: { shop: string };
}

const page: FC<PageProps> = ({ params }) => {
  const shop = params.shop;

  const [shops, setShops] = useState<Shop[]>([]);

  const [items, setItems] = useState<any[]>([]);

  const addVal1 = async () => {
    console.log(shop);
    const q = query(collection(database, "shop"), where("shop_id", "==", shop));
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
    const q = query(collection(database, "items"), where("domain", "==", shop));
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

  console.log("shop name", shops[0]);
  console.log("items", items);
  return (
    <>
      <section className="relative py-12 bg-gray-900 ">
        <div className="absolute inset-0">
          <img
            className="object-cover w-full h-full  opacity-80 bg-black"
            src="/shop.jpg"
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-gray-900/70 lg:bg-gray-900/50"></div>
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className=" flex flex-col justify-center w-full">
            <Card
              isBlurred
              className="border-none mx-auto  bg-transparent pr-36 pl-4 py-2 "
              shadow="sm"
            >
              <CardHeader className="flex gap-5   w-full">
                <Image
                  alt="nextui logo"
                  height={40}
                  radius="sm"
                  src={shops[0]?.shop_logo}
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-xl font-semibold text-white">
                    {" "}
                    {shops[0]?.shop_name}
                  </p>
                  <p className="text-small  text-gray-300">
                    {" "}
                    {shops[0]?.shop_type}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardFooter>
                <nav className="flex justify-center   text-center mx-auto">
                  <ol role="list" className="flex items-center space-x-0.5">
                    <li>
                      <div className="-m-1">
                        <a
                          href="#"
                          title=""
                          className="p-1 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:text-white focus:ring-white hover:text-white"
                        >
                          {" "}
                          Home{" "}
                        </a>
                      </div>
                    </li>

                    <li>
                      <div className="flex items-center">
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <div className="-m-1">
                          <a
                            href="#"
                            title=""
                            className="p-1 ml-0.5 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:text-white focus:ring-white hover:white"
                          >
                            {" "}
                            Category{" "}
                          </a>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="flex items-center">
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                        <div className="-m-1">
                          <a
                            href="#"
                            title=""
                            className="p-1 ml-0.5 text-sm font-medium text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:text-white focus:ring-white hover:text-white"
                            aria-current="page"
                          >
                            {" "}
                            Best sellers{" "}
                          </a>
                        </div>
                      </div>
                    </li>
                  </ol>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
};

export default page;
