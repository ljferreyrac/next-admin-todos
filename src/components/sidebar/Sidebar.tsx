import Image from "next/image"
import Link from "next/link"
import { CiLogout } from "react-icons/ci"
import { SidebarItem } from "./SidebarItem"
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoListOutline, IoPerson } from "react-icons/io5"
import { PiCookie } from "react-icons/pi"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { LogoutButton } from "./LogoutButton"

const items = [
  {
    path: '/dashboard',
    icon: <IoCalendarOutline/>,
    text: 'Dashboard',
  },
  {
    path: '/dashboard/rest-todos',
    icon: <IoCheckboxOutline/>,
    text: 'Rest TODOS',
  },
  {
    path: '/dashboard/server-todos',
    icon: <IoListOutline/>,
    text: 'Server Actions',
  },
  {
    path: '/dashboard/cookies',
    icon: <PiCookie/>,
    text: 'Cookies',
  },
  {
    path: '/dashboard/products',
    icon: <IoBasketOutline/>,
    text: 'Products',
  },
  {
    path: '/dashboard/profile',
    icon: <IoPerson/>,
    text: 'Profile',
  },
] 

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const avatar = session?.user?.image ?? "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
  const userName = session?.user?.name ?? 'No name';
  const userRoles = session?.user?.roles ?? ['client'];
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <Link href="#" title="home">
              <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" className="w-32" alt="tailus logo" width={0} height={0}/>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <Image src={avatar} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" width={200} height={200}/>
              <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
              <span className="hidden text-gray-400 lg:block capitalize">{userRoles.join(', ')}</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {
              items.map(item => (
                <SidebarItem key={item.path} {...item}/>
              ))
            }
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <LogoutButton/>
        </div>
      </aside>
  )
}
