import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister";

export const viewport: Viewport = {
  themeColor: "#FF7E5F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Dukaan Saathi v3.0",
  description: "AI-powered sales & marketing companion for home-based D2C sellers in India.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dukaan Saathi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased text-dark-gray bg-cream w-full">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
