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

type Shop = {
  shop_name: string;
  shop_id: string;
  shop_type: string;
  shop_email: string;
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

  const { user, login, loging } = useAuth();
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
  

  const whatsappLink = `https://wa.me/919037106287?text=hey%20i%20just%20visited%20${shops[0]?.shop_id}`;

  return (
    <div className="flex flex-col w-full min-h-screen">
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
                <img className="block w-auto h-8 bg-gray-300/60  lg:hidden" src="/logod.png" alt="" />
                <img className="hidden w-auto h-12 lg:block" src="/logo.png" alt="" />
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
        <div className="hidden bg-red-50 rounded-r-xl  min-h-screen xl:flex xl:w-64 xl:flex-col">
          <div className="flex flex-col pt-5 overflow-y-auto">
            <div className="flex flex-col justify-between flex-1 h-full px-4">
              <div className="space-y-4">

                {/* <nav className="flex-1 space-y-1">
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
                </nav> */}

                {/* <div>
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
                <div className="flex-2 min-h-screen w-[30%]">
                  <div className="flex h-[47%] rounded-2xl bg-gray-800 flex-col ">
                    <div className="flex-2 h-3/5 m-4 p-12 -mt-5">
                      <Qrcode obj={whatsappLink} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 justify-center items-center bg-slate-200 h-[40%] -mt-12 rounded-2xl">
                    <div className="bg-slate-50 w-2/3 rounded-full  flex justify-center items-center h-14 border-black border">
                      <span className="text-xl text-black font-body4  font-normal">
                        <span className="mr-1 text-2xl rounded-full font-semibold text-green-500">
                          {feedback.length}
                        </span>{" "}
                        Feedback
                      </span>
                    </div>{" "}
                    {/* <div className="bg-slate-50 w-2/3 rounded-full  flex justify-center items-center h-14 border-black border">
                      <span className="text-xl text-black font-body4  font-normal">
                        <span className="mr-1 text-2xl rounded-full font-semibold text-red-500 ">
                          12
                        </span>{" "}
                        Complaits
                      </span>
                    </div> */}
                  </div>
                </div>
                <div className=" h-full min-h-screen  w-[70%]">
                  <Table
                    color="default"
                    selectionMode="single"
                    defaultSelectedKeys={["2"]}
                    aria-label="Example static collection table"
                  >
                    <TableHeader className="font-body1">
                      <TableColumn className="font-body1">NAME</TableColumn>
                      <TableColumn>PHONE NUMBER</TableColumn>
                      <TableColumn>FEEDBACK</TableColumn>
                      <TableColumn>SUMMARY</TableColumn>
                    </TableHeader>
                    <TableBody  className="font-body1">
                      {feedback?.map((feedback) => (
                        <TableRow  key={feedback.id} onClick={onOpen}>
                          <TableCell className="font-body1">
                            {feedback.user_name}
                          </TableCell>
                          <TableCell className="font-body1">
                            {feedback.user}
                          </TableCell>
                          <TableCell>
                            <Chip
                              className="font-body1"
                              variant="faded"
                              color="default"
                            >
                              {feedback.emoji}{" "}
                              {getRatingFromEmoji(feedback.emoji)}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <Button
                              onPress={onOpen}
                              className="bg-blue-100 py-1 font-body1 rounded-full"
                            >
                              View Summary
                            </Button>
                            <Modal
                              size="sm"
                              isOpen={isOpen}
                              onOpenChange={onOpenChange}
                            >
                              <ModalContent>
                                {(onClose:any) => (
                                  <>
                                    <ModalHeader className="flex flex-col gap-1">
Summary                                    </ModalHeader>
                                    <ModalBody className="font-body1">
                                      <p>{feedback.feed_summary}</p>
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                      >
                                        Close
                                      </Button>
                                      {/* <Button color="primary" onPress={onClose}>
                                        Action
                                      </Button> */}
                                    </ModalFooter>
                                  </>
                                )}
                              </ModalContent>
                            </Modal>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function getRatingFromEmoji(emoji: string): string {
  switch (emoji) {
    case "😍":
      return "5/5";
    case "😄":
      return "4/5";
    case "😊":
      return "3/5";
    case "🥲":
      return "2/5";
    case "🤬":
      return "1/5";
    default:
      return "Unknown";
  }
}