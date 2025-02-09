import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import NextTopLoader, { NextTopLoaderProps } from "nextjs-toploader";

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
  const topLoaderProps: NextTopLoaderProps = {
    color: "#fccc63",
    height: 3,
    showSpinner: false,
  };

  return (
    <html lang="en">
      <body className={` antialiased`}>
        <NextTopLoader {...topLoaderProps} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
