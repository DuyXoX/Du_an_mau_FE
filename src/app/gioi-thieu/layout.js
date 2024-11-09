import Footer from '@/layouts/Footer';
import Navigation from '@/layouts/Navigation';

export const metadata = {
    title: "Nông Sản - Giới Thiệu",
    description: "",
};

export default function NestedLayout({ children }) {

    return (
        <>
            <Navigation />
            {children}
            <Footer />
        </>
    );
};