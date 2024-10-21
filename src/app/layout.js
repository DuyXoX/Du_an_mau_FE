import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import "react-icons";
import { ToastContainer } from 'react-toastify';
import Header from "@/layouts/Header";
import Navigation from "@/layouts/Navigation";
import Footer from "@/layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fresco",
  description: "Fresco - Thức phẩm sạch",
  link: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        <Navigation />
        {children}
        <Footer />
        <ToastContainer
          position="top-center"
          stacked />
      </body>
    </html>
  );
}