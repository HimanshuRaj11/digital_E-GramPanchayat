'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <div className="fixed w-full z-20 top-0">
            {/* Top Bar */}
            <div className="bg-zinc-900 text-white py-1 px-4 text-xs sm:text-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span>Government of India | Digital Gram Panchayat</span>
                    <div className="flex space-x-4">
                        <span>Language: English</span>
                        <span>Accessibility</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className="bg-white dark:bg-zinc-900 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2">
                                {/* Placeholder for Emblem */}
                                <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                                    GOI
                                </div>
                                <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                    E-Gram <span className="text-blue-600">Panchayat</span>
                                </span>
                            </Link>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Home
                                    </Link>
                                    <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Services
                                    </Link>
                                    <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        About
                                    </Link>
                                    <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            {session ? (
                                <div className="flex items-center space-x-4">
                                    <Link href={['admin', 'officer', 'staff'].includes((session.user as any).role) ? "/admin" : "/dashboard"} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Dashboard
                                    </Link>
                                    <button onClick={() => signOut()} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                                    Login
                                </Link>
                            )}
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-zinc-900 shadow-lg border-t dark:border-zinc-800">
                            <Link href="/" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium">
                                Home
                            </Link>
                            <Link href="/services" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium">
                                Services
                            </Link>
                            <Link href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium">
                                About
                            </Link>
                            <Link href="/contact" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium">
                                Contact
                            </Link>
                            {session ? (
                                <>
                                    <Link href={['admin', 'officer', 'staff'].includes((session.user as any).role) ? "/admin" : "/dashboard"} className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium">
                                        Dashboard
                                    </Link>
                                    <button onClick={() => signOut()} className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors mt-4">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link href="/login" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors mt-4">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
