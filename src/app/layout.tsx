import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piyush Aggarwal — Student Developer",
  description:
    "Piyush Aggarwal is a student at SRM University, Sonepat, exploring full-stack development, AI, and useful software through projects.",
  openGraph: {
    title: "Piyush Aggarwal — Student Developer",
    description: "Projects and explorations in full-stack development, AI, and useful software.",
    type: "website",
    siteName: "Piyush Aggarwal"
  },
  twitter: {
    card: "summary",
    title: "Piyush Aggarwal — Student Developer",
    description: "Projects and explorations in full-stack development, AI, and useful software."
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}