import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hairo Jets",
  description: "Premium private aviation and cinematic aerial experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
