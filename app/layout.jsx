import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import { DarkModeProvider } from "./components/DarkModeProvider";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "What's in Your Fridge?",
  description: "Discover recipes based on the ingredients you have at home!",
  icons: {
    icon: "/ai_chef.png",
    apple: "/ai_chef.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <DarkModeProvider>
          <LanguageProvider>
            <div className="flex-grow">
              <div className="absolute top-2 right-2 z-20">
                <LanguageSwitcher />
              </div>
              {children}
            </div>
            <Footer />
          </LanguageProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}
