import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Navigation from "@/layouts/Navigation";

export const metadata = {
    title: "Nông Sản - Thông tin",
    description: "",
};

export default function NestedLayout({ children }) {
    return (
        <>
            <Header />
            <Navigation />
            {children}
            <Footer />
        </>
    );
};