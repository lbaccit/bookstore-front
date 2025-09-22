import React from "react";
import Header from "@/shared/ui/Header";
import Footer from "@/shared/ui/Footer";

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
    </div>
  );
}