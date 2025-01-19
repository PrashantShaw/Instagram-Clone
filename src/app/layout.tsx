import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/common/ThemeProvider";

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
