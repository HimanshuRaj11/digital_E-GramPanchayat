'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MyApplications() {
    const { data: session } = useSession();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetch('/api/applications')
                .then((res) => res.json())
                .then((data) => {
                    setApplications(data.applications || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [session]);

    if (!session) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                <p className="text-zinc-500 mb-8">Please login to view your applications.</p>
                <Link href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Login</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
                        My <span className="text-blue-600">Applications</span>
                    </h1>
                    <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
                        Track the status of your submitted service requests.
                    </p>
                </div>
                <Link
                    href="/services"
                    className="hidden sm:inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 active:scale-95"
                >
                    Apply for Service
                </Link>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 w-full bg-zinc-100 dark:bg-zinc-800 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            ) : applications.length === 0 ? (
                <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                    <p className="text-zinc-500 mb-6">You haven't submitted any applications yet.</p>
                    <Link href="/services" className="text-blue-600 font-bold hover:underline">Browse all services</Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {applications.map((app: any) => (
                        <div
                            key={app._id}
                            className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between"
                        >
                            <div className="mb-4 md:mb-0">
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                                    {app.serviceId?.name || 'Unknown Service'}
                                </h2>
                                <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">
                                    Reference ID: {app._id.substring(app._id.length - 8)}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <div className="text-right">
                                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Applied On</div>
                                    <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="h-8 w-px bg-zinc-100 dark:bg-zinc-800 hidden sm:block"></div>

                                <div>
                                    <span
                                        className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold capitalize ${app.status === 'approved' || app.status === 'completed'
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : app.status === 'rejected'
                                                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                    : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                            }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${app.status === 'approved' || app.status === 'completed' ? 'bg-green-600' :
                                                app.status === 'rejected' ? 'bg-red-600' : 'bg-blue-600 animate-pulse'
                                            }`}></span>
                                        {app.status}
                                    </span>
                                </div>

                                <Link
                                    href={`/dashboard/applications/${app._id}`}
                                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    <svg className="w-5 h-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
