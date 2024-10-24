import { SidebarHamberger } from "@/containers/context/SidebarHamberger";
import { HeadeTitle } from "@/containers/context/HeadeTitle";
import { InfoUser } from "@/containers/context/InfoUser";
import QuanLy from "./QuanLy";

export const metadata = {
    title: "Fresco - Quản lý",
    description: "",
};

export default function NestedLayout({ children }) {

    return (
        <>
            <InfoUser>
                <HeadeTitle>
                    <SidebarHamberger>
                        <QuanLy>
                            {children}
                        </QuanLy>
                    </SidebarHamberger>
                </HeadeTitle>
            </InfoUser>
        </>
    );
};