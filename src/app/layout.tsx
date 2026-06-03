import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gau Amrit Traders - Pure Cow Products, Pure Life",
  description: "Premium A2 cow ghee, milk, dairy products, pooja items & natural cow products. Traditional Bilona method, lab tested, farm fresh delivery.",
  keywords: ["A2 ghee", "cow ghee", "bilona ghee", "A2 milk", "cow products", "panchagavya", "gomutra", "havan samagri", "cow dung cakes", "gaushala"],
  authors: [{ name: "Gau Amrit Traders" }],
  openGraph: {
    title: "Gau Amrit Traders - Pure Cow Products, Pure Life",
    description: "Premium A2 cow ghee, milk, dairy products, pooja items & natural cow products.",
    type: "website",
    locale: "en_IN",
    siteName: "Gau Amrit Traders",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gau Amrit Traders - Pure Cow Products, Pure Life",
    description: "Premium A2 cow ghee, milk, dairy products, pooja items & natural cow products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
