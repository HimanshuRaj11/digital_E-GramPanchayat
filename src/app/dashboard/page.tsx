'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
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
        return <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-3xl m-8 border border-zinc-200 dark:border-zinc-800">Please login to view dashboard.</div>;
    }

    const approvedCount = applications.filter((a: any) => a.status === 'approved' || a.status === 'completed').length;
    const pendingCount = applications.filter((a: any) => a.status === 'pending' || a.status === 'in-review').length;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
                        Welcome back, <span className="text-blue-600">{session.user?.name}</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Manage your profile and track village service requests.</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 active:scale-95"
                    >
                        New Service Request
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 font-bold">∑</div>
                    <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">{applications.length}</div>
                    <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Total Applications</div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 mb-6 font-bold">✓</div>
                    <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">{approvedCount}</div>
                    <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Approved/Done</div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 font-bold">!</div>
                    <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">{pendingCount}</div>
                    <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">In Processing</div>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Recent Activity</h2>
                    <Link href="/dashboard/applications" className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</Link>
                </div>
                <div className="p-0">
                    {loading ? (
                        <div className="p-12 text-center animate-pulse text-zinc-400 font-medium">Crunching your data...</div>
                    ) : applications.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-zinc-500 mb-6">No applications found in your history.</p>
                            <Link href="/services" className="text-blue-600 font-bold hover:underline">Start your first application</Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {applications.slice(0, 5).map((app: any) => (
                                <div key={app._id} className="p-6 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                    <div>
                                        <div className="text-base font-bold text-zinc-900 dark:text-white mb-1">{app.serviceId?.name || 'Unknown Service'}</div>
                                        <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{new Date(app.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${app.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            app.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        }`}>
                                        {app.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
