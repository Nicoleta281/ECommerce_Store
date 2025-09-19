import Link from "next/link";
import { Category } from "@/types";

interface MainNavProps {
    data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
    data
}) => {
    // Handle case when data is empty or undefined
    if (!data || data.length === 0) {
        return (
            <nav className="ml-6 flex items-center space-x-4 lg:space-x-6">
                <span className="text-sm text-neutral-400">Categories loading...</span>
            </nav>
        );
    }

    const routes = data.map((route: Category) => ({
        href: `/category/${route.id}`,
        label: route.name
    }));

    return (
        <nav className="ml-6 flex items-center space-x-4 lg:space-x-6">
            {routes.map((route) => (
                <Link href={route.href} key={route.href} className="text-sm font-medium transition-colors hover:text-black text-neutral-500">
                    {route.label}
                </Link>
            ))}
        </nav>
    );
};

export default MainNav;