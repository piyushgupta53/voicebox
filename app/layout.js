import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./components/Provider";

const inter = Inter({ subsets: ["latin"] });

const CalFont = localFont({
  src: "./fonts/CalSans-SemiBold.woff",
});

export const metadata = {
  title: "VoiceBox",
  description: "Convert your text to human like voices",
};

export default function RootLayout({ children }) {
  return (
    <Provider>
      <html lang="en">
        <body className={CalFont.className}>{children}</body>
      </html>
    </Provider>
  );
}
