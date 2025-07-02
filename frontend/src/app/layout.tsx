import "./globals.css";
import { Open_Sans, Roboto } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600", "700", "800"], // include 400 if you use it
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Student Registration Portal",
  description: "Welcome to Springfield Institute",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${roboto.variable}`}>
      <body className="font-roboto">{children}</body>
    </html>
  );
}
