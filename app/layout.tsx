import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { CartFab } from "@/components/CartFab";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  title: "כלבו תל קציר",
  description: "הזמנה מהירה בווטסאפ – כלבו תל קציר.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="h-full">
      <body
        className={`${heebo.variable} min-h-full bg-[#F7F7F2] text-zinc-900 antialiased`}
      >
        <Header />
        {children}
        <CartFab />
        <CartDrawer />
      </body>
    </html>
  );
}
