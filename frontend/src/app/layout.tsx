import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ARLO — A Reflective Learning Odyssey",
  description: "No tests. No scores. Just you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full antialiased bg-[#181E2E] text-[#F5F0E8]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
