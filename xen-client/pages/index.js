import CallToAction from "@/components/CallToAction";
import LoginModal from "@/components/LoginModal";
import useToggle from "@/lib/use-toggle";
import Navbar from "@/components/Navbar";
import {useAuth} from '@/lib/auth';
import Sidebar from "@/components/UIShell";
import UIShell from "@/components/UIShell";
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
            <UIShell>
                <div className='select-none mt-16 text-2xl'>Your Flow</div>
            </UIShell>
        )
    }
}