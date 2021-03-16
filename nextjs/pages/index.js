import Head from "next/head";
import Device from "../components/device";
import Navbar from "../components/navbar";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Alwas AI</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
        </div>
    );
}
