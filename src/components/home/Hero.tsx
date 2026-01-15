import Link from "next/link";

const Hero = () => {
    return (
        <div className="relative bg-white dark:bg-zinc-900 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white dark:bg-zinc-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <svg
                        className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-zinc-900 transform translate-x-1/2"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polygon points="50,0 100,0 50,100 0,100" />
                    </svg>

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Digital Governance for</span>{" "}
                                <span className="block text-blue-600 xl:inline">Rural India</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Experience the future of Gram Panchayat services. Apply for certificates, pay taxes, and access welfare schemes online with ease, transparency, and speed.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link
                                        href="/services"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <Link
                                        href="/about"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 md:py-4 md:text-lg md:px-10"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-blue-50 dark:bg-zinc-800 flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="w-full h-full bg-linear-to-br from-blue-400 to-indigo-600 opacity-20 absolute inset-0"></div>
                    <div className="relative z-10">
                        <svg className="h-32 w-32 mx-auto text-blue-600 dark:text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Digital E-Gram Panchayat</h3>
                        <p className="text-gray-600 dark:text-gray-300">Connecting Villages to the Future</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
