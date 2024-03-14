import Link from "next/link";

export default function Header() {
    return (
        <>
            <header className="bg-black p-8">
                <Link href={"/"}>
                    <nav className="flex mx-auto container">
                        <h1 className="text-2xl md:text-4xl font-bold text-white mx-auto">
                            English Speak
                        </h1>
                    </nav>
                </Link>
            </header>
        </>
    );
}