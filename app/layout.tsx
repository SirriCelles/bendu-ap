import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
