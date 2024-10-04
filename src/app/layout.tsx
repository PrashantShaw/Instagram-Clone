import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Intagram Clone",
  description: "Intagram Clone",
  icons: {
    icon: "/instagram.png",
    apple: "/instagram.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
