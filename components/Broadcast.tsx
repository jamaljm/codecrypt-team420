"use client";

import React, { useEffect } from "react";
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
import router, { useRouter } from "next/router";
import Qrcode from "./Qrcode";
import Sendpost from "./Sendpost";

type Shop = {
  shop_name: string;
  shop_id: string;
  shop_type: string;
  shop_email: string;
};

export default function Broadcast() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [shops, setShops] = useState<Shop[]>([]);

  const { user, login, loging } = useAuth();
  console.log(shops);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("shop")
          .select("*")
          .eq("shop_email", user.email);
        if (error) {
          console.error("Error fetching data from Supabase:", error);
        } else {
          setShops(data as Shop[]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  const whatsappLink = `https://wa.me/919037106287?text=hii${shops[0]?.shop_id}`;
  console.log(shops.length);
  console.log(user);
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="bg-white border-b px-6 border-gray-200">
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
                  className="hidden w-auto h-8 lg:block"
                  src="/logod.png"
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
        <div className="hidden bg-slate-200 rounded-r-xl  min-h-screen xl:flex xl:w-64 xl:flex-col">
          <div className="flex flex-col pt-5 overflow-y-auto">
            <div className="flex flex-col justify-between flex-1 h-full px-4">
              <div className="space-y-4">
                {shops.length == 0 && <AddStore />}

                <nav className="flex-1 space-y-1">
                  <a
                    href="/dashboard"
                    title=""
                    className="flex font-body1 items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-slate-100 group"
                  >
                    <span className="text-lg mr-1">🏠</span>
                    Dashboard
                  </a>
                  <a
                    href="/summary"
                    title=""
                    className="flex font-body1 items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 rounded-lg hover:bg-slate-100 group"
                  >
                    <span className="text-lg mr-1">📝</span>
                    Summary
                  </a>
                </nav>

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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-x-hidden">
          <main className="flex gap-8 min-h-screen p-8">
            {shops.length == 0 ? (
              <div></div>
            ) : (
              <>
                <Sendpost />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
