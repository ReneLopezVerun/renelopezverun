import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Frontend Developer | Next.js Freelancer",
    template: "%s | Frontend Developer",
  },
  description:
    "Frontend Developer specialized in Next.js, dashboards, authentication systems and scalable UI.",
  keywords: [
    "Frontend Developer",
    "Next.js",
    "React",
    "Freelance Developer",
    "Supabase",
    "Tailwind",
  ],
  openGraph: {
    title: "Frontend Developer | Next.js Freelancer",
    description:
      "I build real products: dashboards, auth systems and scalable UI with Next.js.",
    url: "renelopezverun.vercel.app",
    siteName: "Rene Lopez Verun",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend Developer | Next.js Freelancer",
    description:
      "Dashboards, authentication systems and scalable UI with Next.js.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
