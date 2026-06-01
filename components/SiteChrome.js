"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

// Shared chrome across every route: the navbar and the chatbot, with the
// chatbot's open state lifted here so the navbar's "Ask the Herald" button
// (on any page) can summon it.
export default function SiteChrome({ children }) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Navbar onSummon={() => setChatOpen(true)} />
      {children}
      <Chatbot
        open={chatOpen}
        onOpen={() => setChatOpen(true)}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}
