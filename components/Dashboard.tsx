"use client";

import React, { use, useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
  Input,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import AddStore from "./AddStore";
import { supabase } from "../utils/supabase/client";
import { useAuth } from "../Authcontext";
import axios from "axios";
import router, { useRouter } from "next/router";
import { database, storage } from "../firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import toast, { Toaster } from "react-hot-toast";
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
import { set } from "firebase/database";

type Shop = {
  shop_name: string;
  shop_id: string;
  shop_type: string;
  shop_email: string;
  shop_logo: string;
  shop_product: string;
};

type Feedback = {
  id: number;
  user: number;
  emoji: string;
  user_name: string;
  feed_summary: string;
};

export default function Dashboard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shops, setShops] = useState<Shop[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [add, setAdd] = useState("upload");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login, loging } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(database, "shop"),
          where("shop_email", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((event) => {
          // console.log(event.id, " => ", event.data());
        });
        const filteredData = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Shop),
        }));
        // .filter((data) => data.verified);
        setShops(filteredData as Shop[]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log(shops);
  useEffect(() => {
    const fetchData_feedback = async () => {
      console.log(shops[0]?.shop_id);

      try {
        console.log(shops[0]?.shop_id);
        const { data, error } = await supabase
          .from("feedback")
          .select("*")
          .eq("shop_id", shops[0]?.shop_id);

        if (error) {
          console.error("Error fetching data from Supabase:", error);
        } else {
          setFeedback(data as Feedback[]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData_feedback();
  }, [shops]);

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const image = new Image();

      image.onload = async () => {
        handleUploadClick(selectedFile);
      };

      // Load the selected file as an image
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          image.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleUploadClick = () => {
    setLoading(true);
    axios
      .post(
        "https://768c-2409-40f3-1018-e638-1453-36eb-4464-2078.ngrok-free.app/extract-menu",
        {
          image_url:
            image,
        }
      )
      .then((response: any) => {
        console.log(response);
        toast.success("menu created");
        
        setLoading(false);
      })
      .catch((error: Error) => {
        console.error("Error sending POST request:", error);
        toast.error("Failed to send POST request");
        setLoading(false);
      });
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setImage(value);
  };
  const whatsappLink = `https://wa.me/919037106287?text=hey%20i%20just%20visited%20${shops[0]?.shop_id}`;

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Toaster />
      <header className="bg-white border-b px-6 border-red-200">
        <div className="px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center -m-2 xl:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-lg hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex ml-6 xl:ml-0">
              <div className="flex items-center flex-shrink-0">
                <img
                  className="block w-auto h-8 bg-gray-300/60  lg:hidden"
                  src="/logod.png"
                  alt=""
                />
                <img
                  className="hidden w-auto h-12 lg:block"
                  src="/logo.png"
                  alt=""
                />
              </div>
            </div>

            <div className="flex items-center justify-end ml-auto space-x-6">
              <button
                type="button"
                className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <img
                  className="object-cover bg-gray-300 rounded-full w-9 h-9"
                  src={user.photoURL}
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-screen">
        <div className="hidden bg-red-50 border-r-2 border-red-700 rounded-r-xl  min-h-screen xl:flex xl:w-64 xl:flex-col">
          <div className="flex flex-col pt-5 overflow-y-auto">
            <div className="flex flex-col justify-between flex-1 h-full px-4">
              <div className="space-y-4">
                <nav className="flex-1 space-y-1">
                  <a
                    href="/dashboard"
                    title=""
                    className="flex font-body1 items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-slate-100 group"
                  >
                    <span className="text-lg mr-1">🏠</span>
                    Dashboard
                  </a>
                  {/* <a
                    href="/summary"
                    title=""
                    className="flex font-body1 items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-slate-100 group"
                  >
                    <span className="text-lg mr-1">📝</span>
                    Summary
                  </a> */}
                </nav>
                {/* 
                <div>
                  <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                    Services
                  </p>
                  <nav className="flex-1 mt-4 space-y-1">
                    <a
                      href="/dashboard"
                      title=""
                      className="flex font-body1 items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-slate-100 group"
                    >
                      <span className="text-lg mr-1">💬</span>
                      Feedback
                    </a>

                    <a
                      href="/complaints"
                      title=""
                      className="flex font-body1 items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-slate-100 group"
                    >
                      <span className="text-lg mr-1">😡</span>
                      Compalaints
                    </a>
                  </nav>
                </div>

                <div>
                  <p className="px-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                    Marketing
                  </p>
                  <nav className="flex-1 mt-4 space-y-1">
                    <a
                      href="/broadcast"
                      title=""
                      className="flex font-body1 items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-slate-100 group"
                    >
                      <span className="text-lg mr-1">📈{"  "}</span>Broadcast
                    </a>
                  </nav>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-x-hidden">
          <main className="flex gap-8 w-full min-h-screen">
            {shops.length == 0 ? (
              <AddStore />
            ) : (
              <>
                <div className="py-12 w-full bg-gray-50 sm:pt-16 lg:pt-12">
                  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="relative  bg-cover bg-center bg-no-repeat bg-[url(../public/bg3.jpg)] flex justify-center mx-auto overflow-hidden bg-red-600 max-w-7xl rounded-3xl">
                      <div className="absolute top-0 left-0">
                        <img
                          className="w-16 md:w-24 lg:w-32 opacity-40 xl:w-full"
                          src="https://landingfoliocom.imgix.net/store/collection/saasui/images/newsletter/3/ring-pattern.svg"
                          alt=""
                        />
                      </div>

                      <div className="relative px-8 py-12 md:p-16 xl:p-12">
                        <div className="max-w-2xl mx-auto text-center">
                          <h2 className="text-3xl font-semibold tracking-tight font-body4  text-white sm:text-4xl lg:text-5xl">
                            {shops[0].shop_name}
                          </h2>
                          <p className="mt-3 text-lg font-body1 text-white">
                            {shops[0].shop_type}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row py-7 justify-between items-center  mx-12 bg-red-50 rounded-3xl border-red-400 border-2 px-12  mt-8">
                    <h2 className="font-body2 text-xl">Upload your menu</h2>
                    <Input
                      onChange={handleChange}
                        type="text"
                        variant="bordered"
                      className="block w-fit text-sm border-black text-red-700 font-body file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-blue-100"
                      />
                      <Button
                        isLoading={loading}
                        onClick={handleUploadClick}
                        className="file:py-2 bg-red-600 text-white font-body file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-blue-100"
                      >Process</Button>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
