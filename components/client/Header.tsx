"use client";

import Link from "next/link";
import ButtonClient from "./Button";
import { useSession } from "@lib/client";

type HeaderClientProps = {
    className?: string;
};

export default function HeaderClient(props: HeaderClientProps) {
    const { className } = props;

    const { data: session } = useSession();

    return (
        <header className={className}>
            {/* Mobile */}
            <nav className="md:hidden">
                <Link href="/">Home</Link>
                <Link href="/register">Register</Link>
                <Link href="/login">Login</Link>
            </nav>

            {/* Desktop */}
            <nav className="flex flex-row gap-5 max-md:hidden">
                <ButtonClient
                    type="link"
                    href="/"
                    label="Home"
                    variant="ghost"
                    ring={false}
                >
                    Home
                </ButtonClient>
                {session ? (
                    <ButtonClient
                        type="link"
                        href="/profile"
                        label="Profile"
                        variant="ghost"
                        ring={false}
                    >
                        Profile
                    </ButtonClient>
                ) : (
                    <>
                        <ButtonClient
                            type="link"
                            href="/register"
                            label="Register"
                            variant="ghost"
                            ring={false}
                        >
                            Register
                        </ButtonClient>
                        <ButtonClient
                            type="link"
                            href="/login"
                            label="Login"
                            variant="ghost"
                            ring={false}
                        >
                            Login
                        </ButtonClient>
                    </>
                )}
                <ButtonClient
                    type="link"
                    href="/cropper"
                    label="Cropper"
                    variant="ghost"
                    ring={false}
                >
                    Cropper
                </ButtonClient>
            </nav>
        </header>
    );
}
