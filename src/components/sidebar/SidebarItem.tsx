'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';

interface Props {
    path: string;
    icon: React.ReactNode;
    text: string;
}

export const SidebarItem = ({ path, icon, text }: Props) => {
    const currentPath = usePathname();
    return (
        <li>
            {
                currentPath === path
                    ? (
                        <Link href={path} className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                            {icon}
                            <span className="-mr-1 font-medium">{text}</span>
                        </Link>
                    )
                    : (
                        <Link href={path} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400">
                            {icon}
                            <span>{text}</span>
                        </Link>
                    )
            }
        </li>
    )
}
