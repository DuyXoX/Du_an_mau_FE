import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";
import "react-icons";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { InFoCart } from "@/containers/context/InFoCart";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nông Sản",
  description: "Nông Sản - Thức phẩm sạch",
  link: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <InFoCart>
          {children}
        </InFoCart>
        <ToastContainer
          position="top-center"
          stacked />
      </body>
    </html>
  );
}