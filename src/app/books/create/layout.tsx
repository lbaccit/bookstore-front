import React from "react";

export default function CreateBookLayout({
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