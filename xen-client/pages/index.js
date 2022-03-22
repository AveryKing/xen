import {useAuth} from '@/lib/auth';
import Navbar from "@/components/Navbar";
import CallToAction from "@/components/CallToAction";
import Modal from "@/components/Modal";
import {useState} from "react";

export default function Index() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
            <CallToAction openSignUp={setIsOpen}  />
        </>
    )
}