import BackToTop from "@/components/backto/BackToTop";
import Footer from "@/layouts/Footer";
import Navigation from "@/layouts/Navigation";

export const metadata = {
    title: "Nông Sản - Thông tin",
    description: "",
};

export default function NestedLayout({ children }) {
    return (
        <>
            <Navigation />
            {children}
            <BackToTop />
            <Footer />
        </>
    );
};