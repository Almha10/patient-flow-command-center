import { Inter, Tajawal } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-tajawal" });

export const metadata = {
  title: "Patient Flow Command Center | لوحة عرض إدارة تدفق المرضى",
  description: "A professional hospital operations dashboard that simulates real-time patient flow inside a healthcare facility.",
};

export default function RootLayout({ children }) {
  return (
    // Default language direction will be handled at the component level
    <html lang="en" dir="ltr">
      <body className={`${inter.variable} ${tajawal.variable}`}>
        {children}
      </body>
    </html>
  );
}
