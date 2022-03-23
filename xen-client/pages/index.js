import CallToAction from "@/components/CallToAction";
import LoginModal from "@/components/LoginModal";
import useToggle from "@/lib/use-toggle";
import Navbar from "@/components/Navbar";
import {useAuth} from '@/lib/auth';
export default function Index() {
    const [loginOpen, toggleLogin] = useToggle();
    const auth = useAuth();
    return (
        <>
            <Navbar openLogin={toggleLogin} />
            <LoginModal isOpen={loginOpen} toggle={toggleLogin} />
            <CallToAction openLogin={toggleLogin}  />
        </>
    )
}