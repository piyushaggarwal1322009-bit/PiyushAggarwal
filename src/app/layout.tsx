import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piyush Aggarwal — Developer & Builder",
  description:
    "Personal portfolio of Piyush Aggarwal — student developer, builder and technology enthusiast based in Delhi.",
  metadataBase: new URL("https://piyushaggarwal1322009-bit.github.io"),
  openGraph: {
    title: "Piyush Aggarwal — Developer & Builder",
    description: "Projects, technology and the journey of Piyush Aggarwal.",
    type: "website"
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