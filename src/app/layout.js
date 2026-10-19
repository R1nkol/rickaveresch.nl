import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { ColorThemeProvider } from "@/contexts/ColorThemeContext";
import { colorThemeInitScript } from "@/lib/colorThemes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rick Averesch",
  description: "Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: colorThemeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <ColorThemeProvider>{children}</ColorThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
