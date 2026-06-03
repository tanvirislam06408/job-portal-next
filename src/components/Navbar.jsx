'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@heroui/react'
import { Bars, Xmark } from '@gravity-ui/icons'
import Image from 'next/image'
import { useSession, signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const navItems = [
    {
        label: 'Browse Jobs',
        href: '/jobs',
    },
    {
        label: 'Companies',
        href: '/companies',
    },
    {
        label: 'Pricing',
        href: '/pricing',
    },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session, isPending } = useSession();
    console.log(session?.user?.role);
    
    const user = session?.user
    const router = useRouter()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSignOut = async () => {
        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        setDropdownOpen(false)
                        router.push("/")
                    }
                }
            })
        } catch (error) {
            console.error("Sign out error:", error)
        }
    }

    const initial = user?.name ? user.name.charAt(0).toUpperCase() : "?"

    return (
        <header className="absolute top-5 left-0 right-0 z-50">
            <div className="px-4">
                <nav className="container mx-auto flex h-[72px] items-center justify-between backdrop-blur-xl">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div>
                            <Image
                                src={'/images/logo.png'}
                                height={50}
                                width={100}
                                alt='navImg'
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-3 ml-auto border rounded-[24px] py-3 px-4 md:px-8 border-white/10 bg-[#111111]/90">
                        {navItems.map(item => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="rounded-full px-5 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/5 hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="mx-2 h-5 w-px bg-white/10" />

                        {!user ? (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-full px-5 py-2.5 text-sm font-medium text-violet-400 hover:bg-violet-500/10"
                                >
                                    Sign In
                                </Link>

                                <Button radius="full" className="h-11 bg-white px-6 font-semibold text-black">
                                    Get Started
                                </Button>
                            </>
                        ) : (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="relative flex items-center justify-center h-10 w-10 rounded-full border border-white/10 hover:border-violet-500/50 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                                >
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.name || "User profile"}
                                            className="h-full w-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white uppercase tracking-wider">
                                            {initial}
                                        </div>
                                    )}
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#111111]/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                        <div className="px-3 py-2.5 mb-1.5 rounded-xl bg-white/5">
                                            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Signed in as</p>
                                            <p className="text-sm font-bold text-white truncate mt-0.5">{user.name}</p>
                                            <p className="text-xs text-zinc-400 truncate mt-0.5">{user.email}</p>
                                        </div>
                                        <div className="h-px bg-white/10 my-1 mx-1" />
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full text-left rounded-xl px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition duration-200 cursor-pointer"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex lg:hidden items-center justify-center rounded-xl p-2 text-white"
                    >
                        {isOpen ? (
                            <Xmark width={22} height={22} />
                        ) : (
                            <Bars width={22} height={22} />
                        )}
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="mt-3 rounded-3xl border border-white/10 bg-[#111111]/95 p-4 backdrop-blur-xl lg:hidden">
                        <div className="flex flex-col gap-2">
                            {navItems.map(item => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="rounded-2xl px-4 py-3 text-zinc-300 hover:bg-white/5 hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            {!user ? (
                                <>
                                    <Link
                                        href="/login"
                                        className="rounded-2xl px-4 py-3 text-violet-400 hover:bg-violet-500/10"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign In
                                    </Link>

                                    <Button radius="full" className="mt-2 bg-white text-black font-semibold" onClick={() => setIsOpen(false)}>
                                        Get Started
                                    </Button>
                                </>
                            ) : (
                                <div className="mt-3 border-t border-white/10 pt-4 flex flex-col gap-4">
                                    <div className="flex items-center gap-3 px-3">
                                        <div className="relative flex items-center justify-center h-12 w-12 rounded-full border border-white/10 overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-600">
                                            {user.image ? (
                                                <img
                                                    src={user.image}
                                                    alt={user.name || "User profile"}
                                                    className="h-full w-full object-cover"
                                                    referrerPolicy="no-referrer"
                                                />
                                            ) : (
                                                <span className="text-base font-bold text-white uppercase">{initial}</span>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                            <p className="text-xs text-zinc-400 truncate mt-0.5">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            handleSignOut();
                                        }}
                                        className="w-full text-center rounded-2xl py-3 text-sm font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition duration-200 cursor-pointer"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}