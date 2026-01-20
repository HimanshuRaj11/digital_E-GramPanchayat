import Link from "next/link";

const services = [
    {
        title: "Certificates",
        description: "Apply for birth, death, caste, and income certificates online with instant digital verification.",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        href: "/services",
    },
    {
        title: "Tax Payment",
        description: "Securely pay property, water, and local taxes using our integrated payment gateway.",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
        ),
        href: "/services",
    },
    {
        title: "Welfare Schemes",
        description: "Check eligibility and apply for PM-Kisan, Pension schemes, and other welfare initiatives.",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        href: "/services",
    },
    {
        title: "Grievance Redressal",
        description: "Submit complaints and track status in real-time. Direct communication with Panchayat.",
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
        ),
        href: "/services",
    },
];

const Services = () => {
    return (
        <section className="py-24 bg-white dark:bg-zinc-900" id="services">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4">Core Services</h2>
                    <p className="text-4xl font-extrabold text-zinc-900 dark:text-white sm:text-5xl tracking-tight mb-6">
                        Everything you need
                    </p>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-8"></div>
                    <p className="max-w-2xl text-xl text-zinc-500 dark:text-zinc-400 mx-auto leading-relaxed">
                        Access a comprehensive suite of government services designed to empower rural citizens with digital accessibility.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <Link
                            key={service.title}
                            href={service.href}
                            className="group relative bg-zinc-100/50 dark:bg-zinc-800/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-white dark:bg-zinc-700 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                <div className="text-blue-600 dark:text-blue-400">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                Explore Service
                                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
