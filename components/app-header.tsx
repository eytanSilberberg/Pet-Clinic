import Link from "next/link"
import Logo from '../assets/imgs/logo.png'
import Image from "next/image"

export const AppHeader = () => {
    return <header className="flex justify-between  border-b-4 border-indigo-500 h-[5rem] bg-priClr col-span-full">
        <div className="logo h-full flex items-center px-4"><Image height='75px' width='75px' src={Logo} alt="" /></div>
        <nav>
            <Link href='/'><button className="h-full bg-priClr hover:bg-secClr font-bold py-2 px-8 rounded-r">Home</button></Link>
        </nav>
    </header>
}