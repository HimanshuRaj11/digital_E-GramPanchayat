'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/services')
            .then((res) => res.json())
            .then((data) => {
                setServices(data.services || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
                    Panchayat <span className="text-blue-600">Services</span>
                </h1>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
                    Search and apply for official Gram Panchayat services. All applications are processed digitally for transparency and speed.
                </p>
                <div className="mt-8 h-1 w-24 bg-blue-600 rounded-full"></div>
            </div>

            {loading ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 rounded-3xl bg-zinc-100 dark:bg-zinc-800 animate-pulse"></div>
                    ))}
                </div>
            ) : services.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service: any) => (
                        <div
                            key={service._id}
                            className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Fees</div>
                                    <div className="text-lg font-extrabold text-zinc-900 dark:text-white">₹{service.fees}</div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                                {service.name}
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8 grow">
                                {service.description}
                            </p>

                            <div className="flex items-center space-x-4 mb-8 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700">
                                <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="text-xs">
                                    <div className="text-zinc-400 font-medium">Processing Time</div>
                                    <div className="text-zinc-900 dark:text-zinc-200 font-bold">{service.processingTime}</div>
                                </div>
                            </div>

                            <Link
                                href={`/services/${service._id}/apply`}
                                className="inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 active:scale-95 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300"
                            >
                                Apply Now
                                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>

                            {/* Mobile button - always visible */}
                            <Link
                                href={`/services/${service._id}/apply`}
                                className="md:hidden mt-2 inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl text-base font-bold text-white bg-blue-600 active:scale-95"
                            >
                                Apply Now
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                    <p className="text-zinc-500">No services found at this time.</p>
                </div>
            )}
        </div>
    );
}
