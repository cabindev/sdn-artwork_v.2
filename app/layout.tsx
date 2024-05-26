// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://app-info.healthypublicspaces.com/"),
  // title: "Dev Blook - A blog for developers",
  title: {
    default: "Blog for Organization",
    template: '%s | Blog for Organization'
  },
  description: "Blog for Organization SDN Workspaces",
  openGraph: {
    title: "SDN Workspaces",
    description: "Blog for Organization SDN Workspaces",
    type: "website",
    locale: "en_US",
    url: "https://app-info.healthypublicspaces.com",
    siteName: "DevBlook"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">

      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
