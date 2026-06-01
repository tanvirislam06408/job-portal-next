'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@heroui/react'
import { Bars, Xmark } from '@gravity-ui/icons'
import Image from 'next/image'
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

                        <Link
                            href="/login"
                            className="rounded-full px-5 py-2.5 text-sm font-medium text-violet-400 hover:bg-violet-500/10"
                        >
                            Sign In
                        </Link>

                        <Button radius="full" className="h-11 bg-white px-6 font-semibold text-black">
                            Get Started
                        </Button>
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
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <Link
                                href="/login"
                                className="rounded-2xl px-4 py-3 text-violet-400 hover:bg-violet-500/10"
                            >
                                Sign In
                            </Link>

                            <Button radius="full" className="mt-2 bg-white text-black font-semibold">
                                Get Started
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}