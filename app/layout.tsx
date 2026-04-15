import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hairojets.com"),
  title: {
    default: "Hairo Jets | Private Aviation, Reimagined",
    template: "%s | Hairo Jets",
  },
  description:
    "Hairo Jets delivers premium private aviation with cinematic presentation, discreet coordination, and global reach.",
  applicationName: "Hairo Jets",
  keywords: [
    "private aviation",
    "jet charter",
    "luxury air travel",
    "private jet service",
    "air charter",
    "executive travel",
    "VIP aviation",
  ],
  authors: [{ name: "Hairo Jets" }],
  creator: "Hairo Jets",
  publisher: "Hairo Jets",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Hairo Jets",
    title: "Hairo Jets | Private Aviation, Reimagined",
    description:
      "Premium private aviation with cinematic presentation, discreet coordination, and global reach.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hairo Jets private aviation experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hairo Jets | Private Aviation, Reimagined",
    description:
      "Premium private aviation with cinematic presentation, discreet coordination, and global reach.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
