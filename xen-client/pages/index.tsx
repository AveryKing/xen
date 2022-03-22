import type {NextPage} from 'next'
import Navbar from "../components/Navbar";
import CallToAction from "../components/CallToAction";

const Home: NextPage = () => {
    return (
        <>
            <Navbar/>
            <CallToAction/>
        </>
    )
}

export default Home
