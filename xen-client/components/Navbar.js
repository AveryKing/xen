import {GiYinYang} from 'react-icons/gi'
import {motion} from "framer-motion";
import {useAuth} from '@/lib/auth';
import {FiChevronDown} from 'react-icons/fi';
import {IoIosNotificationsOutline} from 'react-icons/io';

const Navbar = ({openLogin}) => {
    const auth = useAuth();

    const topRightGroup = auth.loggedIn
        ? <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                className='flex items-center space-x-1 -mr-5 md:mr-0'>
                <IoIosNotificationsOutline
                    className='mr-5 hover:scale-110 hover:bg-pink-50 rounded-full hover:cursor-pointer w-10' size={30}/>
                <div
                    className='hover:cursor-pointer px-4 py-0 h-10 rounded-full items-center space-x-1 flex hover:bg-pink-50'>
                    <img src={auth.user.photoUrl}
                         alt={auth.user.name}
                         className='w-8 rounded-full'/>
                    <p>{auth.user.name}</p>
                    <FiChevronDown size={24}/>
                </div>
            </motion.div>
        </> : <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                className='flex items-center space-x-5 text-pink-500'>
                <h3>Sign In</h3>
                <button
                    onClick={() => openLogin()}
                    className='hover:scale-105 hover:bg-pink-400 border px-4 py-1 rounded-full bg-pink-500 text-white border-pink-500'>
                    Get Started
                </button>
            </motion.div>
        </>;

    return (
        <>
            <header className='select-none font-ubuntu flex justify-between px-8 py-3 max-w-full mx-auto border-2'>
                <div className="flex items-center space-x-5">
                    <div
                        className={'flex items-center space-x-2 text-2xl'}>
                        <motion.a
                            initial={{rotate: 0}}
                            animate={{rotate: 360}}
                            transition={{duration: 10}}
                            href={'/'}>
                            <GiYinYang
                                className={'text-4xl text-pink-500'}/>
                        </motion.a>
                        <motion.p
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1}}
                            className='font-logo font-semibold lg:text-3xl'>Xen
                        </motion.p>
                    </div>
                    {!auth.loggedIn &&
                    <>
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1}}
                            className=" hidden md:inline-flex items-center space-x-5">
                            <h3>Home</h3>
                            <h3>Explore</h3>
                            <h3>About</h3>
                        </motion.div>
                    </>
                    }
                </div>
                {topRightGroup}
            </header>
        </>
    )
}
export default Navbar;