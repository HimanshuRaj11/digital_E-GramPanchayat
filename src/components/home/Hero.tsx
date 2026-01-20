import Link from "next/link";

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 py-16 sm:py-24 lg:py-32">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                    <div className="sm:text-center lg:text-left lg:col-span-7">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">New Digital Services Available</span>
                        </div>

                        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl lg:text-7xl mb-6">
                            <span className="block">Digital Governance</span>
                            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">for Rural India</span>
                        </h1>

                        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl sm:mx-auto lg:mx-0 leading-relaxed mb-10">
                            Experience the future of Gram Panchayat services. Apply for certificates, pay taxes, and access welfare schemes online with ease, transparency, and speed.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all active:scale-95"
                            >
                                Get Started
                                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-2xl text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 shadow-sm transition-all active:scale-95"
                            >
                                Learn More
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center space-x-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 sm:justify-center lg:justify-start">
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Trusted By</span>
                            <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700"></div>
                            <span className="font-bold text-zinc-800 dark:text-zinc-200">MeitY</span>
                            <span className="font-bold text-zinc-800 dark:text-zinc-200">NIC</span>
                            <span className="font-bold text-zinc-800 dark:text-zinc-200">Digital India</span>
                        </div>
                    </div>

                    <div className="mt-16 lg:mt-0 lg:col-span-5 relative">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-white/20 backdrop-blur-sm">
                            <div className="aspect-square bg-linear-to-br from-blue-600/20 via-zinc-100 to-orange-500/20 dark:from-blue-900/40 dark:via-zinc-900 dark:to-orange-900/40 flex items-center justify-center p-12">
                                <div className="w-full max-w-[280px] aspect-square relative group">
                                    {/* Abstract Visual Representing Digital Village */}
                                    <div className="absolute inset-0 bg-blue-600 rounded-4xl rotate-6 scale-95 opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
                                    <div className="absolute inset-0 bg-orange-500 rounded-[2.5rem] -rotate-6 scale-95 opacity-20 group-hover:-rotate-12 transition-transform duration-500"></div>
                                    <div className="relative bg-white dark:bg-zinc-800 h-full w-full rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 border border-zinc-100 dark:border-zinc-700">
                                        <svg className="h-24 w-24 text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Smart Village</h4>
                                        <p className="text-zinc-500 text-center text-sm">Empowering every citizen with digital tools.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
