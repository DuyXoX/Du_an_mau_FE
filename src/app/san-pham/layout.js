import { InFoCart } from "@/containers/context/InFoCart";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import Navigation from "@/layouts/Navigation";

export default function NestedLayout({ children }) {

    return (
        <>
            <Header />
            <Navigation />
            <InFoCart>
                {children}
            </InFoCart>
            <Footer />
        </>
    );
};