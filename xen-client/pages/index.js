import CallToAction from "@/components/CallToAction";
import LoginModal from "@/components/Modal";
import useToggle from "@/lib/use-toggle";
import Navbar from "@/components/Navbar";
export default function Index() {
    const [loginOpen, toggleLogin] = useToggle();

    return (
        <>
            <Navbar openLogin={toggleLogin} />
            <LoginModal isOpen={loginOpen} toggle={toggleLogin} />
            <CallToAction openLogin={toggleLogin}  />
        </>
    )
}