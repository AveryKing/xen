import CallToAction from "@/components/CallToAction";
import LoginModal from "@/components/LoginModal";
import useToggle from "@/lib/use-toggle";
import Navbar from "@/components/Navbar";
import {useAuth} from '@/lib/auth';
import Sidebar from "@/components/UIShell";
import UIShell from "@/components/UIShell";
import BlogPostCard from "@/components/Post";
export default function Index() {
    const [loginOpen, toggleLogin] = useToggle();
    const auth = useAuth();
    if(!auth.loggedIn) {
    return (
        <>
            <Navbar openLogin={toggleLogin} />
            <LoginModal auth={auth} isOpen={loginOpen} toggle={toggleLogin} />
            <CallToAction openLogin={toggleLogin}  />
        </>
    )
} else {
        return (
            <UIShell >
                <div className='overflow-y-auto h-[calc(100vh)] w-[calc(100vw-1rem)] md:w-[calc(100vw-16rem)]'>

                    <div>
                    <div className='select-none mt-16 text-2xl mb-3'>Your Flow</div>
                        <div>
                    <BlogPostCard/>
                    <BlogPostCard/>
                    <BlogPostCard/>
                    <BlogPostCard/>
                    <BlogPostCard/>
                    <BlogPostCard/>
                    <BlogPostCard/>
                    <BlogPostCard/>
                        </div>
                    </div>
                </div>
            </UIShell>
        )
    }
}