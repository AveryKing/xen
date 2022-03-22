import {GiYinYang, GiHamburgerMenu} from 'react-icons/gi'
const Navbar = () => {
    return (
        <header className='font-ubuntu flex justify-between px-8 py-3 max-w-full mx-auto shadow-md'>
            <div className="flex items-center space-x-5">
                <div className={'flex items-center space-x-2 text-2xl'}>
                <a href={'/'}>
                   <GiYinYang className={'text-4xl text-pink-500'}/>
                </a>
                <p className='font-logo font-semibold lg:text-3xl'>Xen</p>
                </div>
                <div className=" hidden md:inline-flex items-center space-x-5">
                    <h3>Home</h3>
                    <h3>Explore</h3>
                    <h3 className="text-black">About</h3>
                </div>
            </div>
            <div className='flex items-center space-x-5 text-pink-500'>
                <h3>Sign In</h3>
                <button className='hover:bg-pink-400 border px-4 py-1 rounded-full bg-pink-500 text-white border-pink-500'>Get Started</button>
            </div>
        </header>
    )
}
export default Navbar;