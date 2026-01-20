'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { getNavItemsByRole } from '@/config/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { data: session } = useSession();
    const pathname = usePathname();

    // Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const role = (session?.user as any)?.role || 'guest';
    const navItems = getNavItemsByRole(role);

    const isActive = (path: string) => pathname === path;

    return (
        <div className="fixed w-full z-50 transition-all duration-300">
            {/* Top Bar - Hidden on scroll for cleaner look */}
            {!scrolled && (
                <div className="bg-zinc-900/95 text-white py-1.5 px-4 text-[10px] sm:text-xs">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <span className="opacity-80">Government of India</span>
                            <span className="hidden sm:inline-block opacity-40">|</span>
                            <span className="hidden sm:inline-block opacity-80">Digital Gram Panchayat Portal</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="hover:text-blue-400 cursor-pointer transition-colors">English</span>
                            <span className="hover:text-blue-400 cursor-pointer transition-colors">हिंदी</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Navbar */}
            <nav className={`transition-all duration-300 ${scrolled
                ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-lg py-2'
                : 'bg-white dark:bg-zinc-900 py-4'
                } border-b border-zinc-200 dark:border-zinc-800`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div className="h-10 w-10 bg-linear-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
                                    GOI
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                                        E-Gram <span className="text-blue-600">Panchayat</span>
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">Digital Transformation</span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.href)
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right side actions */}
                        <div className="hidden md:flex items-center space-x-4 border-l border-zinc-200 dark:border-zinc-800 ml-4 pl-4">
                            {session ? (
                                <div className="flex items-center space-x-4">
                                    <div className="text-right hidden lg:block">
                                        <div className="text-xs font-semibold text-gray-900 dark:text-white">{session.user?.name}</div>
                                        <div className="text-[10px] text-zinc-500 capitalize">{role}</div>
                                    </div>
                                    <button
                                        onClick={() => signOut()}
                                        className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm border border-zinc-200 dark:border-zinc-700"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Button */}
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <span className="sr-only">Open main menu</span>
                                <div className="w-6 h-6 flex flex-col justify-between items-center py-1">
                                    <span className={`block w-5 h-0.5 bg-current transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                                    <span className={`block w-5 h-0.5 bg-current transition duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                                    <span className={`block w-5 h-0.5 bg-current transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] border-t dark:border-zinc-800 mt-2' : 'max-h-0'}`}>
                    <div className="px-4 pt-4 pb-6 space-y-2 bg-white dark:bg-zinc-900">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive(item.href)
                                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                    : 'text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800">
                            {session ? (
                                <div className="space-y-4">
                                    <div className="px-4">
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">{session.user?.name}</div>
                                        <div className="text-xs text-zinc-500 capitalize">{role}</div>
                                    </div>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl text-base font-bold transition-all text-center"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-center font-bold shadow-lg"
                                >
                                    Login to Portal
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
