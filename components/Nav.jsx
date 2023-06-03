'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react";
import { getProviders, sighIn, signOut, useSession, } from "next-auth/react";

const Nav = () => {


    // initialize provider
    const [providers, setProviders] = useState(null);
    const [toggleDropDown, setToggleDropDown] = useState(false)
    const isUserLoggedIn = true;

    // set providers / Authentication *Google*
    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setProviders()
    }, [])

    const signIn = () => {
        // Authentication Code goes here
    }

    return (
        <nav className="flex-between w-full mb-16 pt-3 px-10">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    alt="prompt ninja logo"
                    width={30}
                    height={30}
                    className="object-contain z-10 "
                />
                <p className="logo_text" >Prompt Ninja</p>
            </Link>


            {/* desktop nav */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button className="outline_btn">Sign Out</button>

                        <Link href="/profile">
                            <Image src="/assets/images/logo.svg"
                                alt="prompt ninja logo"
                                width={30}
                                height={30}
                                className="object-contain z-10 " />
                        </Link>
                    </div>
                ) : (
                    <div>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </div>
                )}
            </div>


            {/* mobile nav */}
            <div className="sm:hidden relative">
                {isUserLoggedIn ? (
                    <div className="flex">
                        <Image src="/assets/images/logo.svg"
                            width={37}
                            height={37}
                            className="rounded-full"
                            onClick={() => setToggleDropDown((prev) => !prev)} //toggle nav
                            alt="profile" />

                        {toggleDropDown && (
                            <div className="dropdown">
                                <Link href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropDown(false)}
                                >
                                    Create Prompt
                                </Link>

                                <button
                                    type="button"
                                    className="mt-5 w-full black_btn"
                                    onClick={() => {
                                        setToggleDropDown(false);
                                        signOut();
                                    }}
                                > Sign Out</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </div>
                )}
            </div>
        </nav >
    )
}

export default Nav