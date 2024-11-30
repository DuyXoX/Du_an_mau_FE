import Footer from "@/layouts/Footer";
import Navigation from "@/layouts/Navigation";

export default function NestedLayout({ children }) {

    return (
        <>
            <Navigation />
            {children}
            <Footer />
        </>
    );
};