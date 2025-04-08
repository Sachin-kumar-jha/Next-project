import { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "react-hot-toast";
export const metadata:Metadata={
  title:"my app"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`antialiased`}
      >
        <Provider>
        <Toaster
  position="top-center"
  toastOptions={{
    duration:1000,
    style: {
      cursor: "pointer", // 👈 adds pointer on hover
    },
    success: {
      iconTheme: {
        primary: "#4ade80", // green
        secondary: "#f0fdf4",
      },
    },
    error: {
      iconTheme: {
        primary: "#f87171", // red
        secondary: "#fef2f2",
      },
    },
  }}
/>
        {children}
        </Provider>
      </body>
    </html>
  );
}
