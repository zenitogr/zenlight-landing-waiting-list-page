"use client";

import { Banner } from "@/components/banner";
import { WaitingListForm } from "@/components/waiting-list-form";
import { DonationSection } from "@/components/donation-section";
import { useContext } from "react";
import { ThemeContext } from "./theme-context";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <>
      <Banner />
      <WaitingListForm theme={theme} />
      <DonationSection />
    </>
  );
}
