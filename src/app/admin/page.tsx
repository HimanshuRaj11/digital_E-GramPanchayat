'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
    const { data: session } = useSession();
    const router = useRouter();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            if ((session.user as any).role === 'citizen') {
                router.push('/dashboard');
                return;
            }

            fetch('/api/applications')
                .then((res) => res.json())
                .then((data) => {
                    setApplications(data.applications || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [session, router]);

    if (loading) return <div className="p-8 text-center animate-pulse py-24 text-zinc-400 font-medium">Initializing Administration Portal...</div>;

    const pendingCount = applications.filter((a: any) => a.status === 'pending' || a.status === 'in-review').length;
    const completedCount = applications.filter((a: any) => a.status === 'approved' || a.status === 'completed').length;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
                        Official <span className="text-blue-600">Dashboard</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Manage village services and citizen applications ({session?.user?.name}).</p>
                </div>
                <div className="flex gap-4">
                    {['officer', 'admin'].includes((session?.user as any).role) && (
                        <button
                            onClick={() => router.push('/admin/services/new')}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20 transition-all active:scale-95"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Create Service
                        </button>
                    )}
                </div>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all">
                    <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">{applications.length}</div>
                    <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Total Vault</div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all border-l-4 border-l-orange-500">
                    <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">{pendingCount}</div>
                    <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest text-orange-600">Awaiting Review</div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all border-l-4 border-l-green-500">
                    <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">{completedCount}</div>
                    <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest text-green-600">Processed</div>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all">
                    <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1">24</div>
                    <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Active Services</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Recent Incoming</h2>
                        <Link href="/admin/applications" className="text-sm font-bold text-blue-600 hover:text-blue-700">Go to Processing →</Link>
                    </div>
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {applications.slice(0, 5).map((app: any) => (
                            <div key={app._id} className="p-6 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold text-zinc-900 dark:text-white">{app.userId?.name}</div>
                                    <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">{app.serviceId?.name}</div>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${app.status === 'approved' || app.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                            'bg-blue-100 text-blue-700'
                                    }`}>
                                    {app.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    {applications.length === 0 && (
                        <div className="p-12 text-center text-zinc-500">No applications in history.</div>
                    )}
                </div>

                <div className="bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                    <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/20 rounded-full blur-[80px]"></div>
                    <h2 className="text-2xl font-bold mb-4 relative z-10">Quick Administration</h2>
                    <p className="text-zinc-400 mb-8 relative z-10">Access specialized areas for governance and portal management.</p>
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        <Link href="/admin/services" className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl border border-zinc-700 transition-colors">
                            <div className="font-bold mb-1">Catalog</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Manage Services</div>
                        </Link>
                        <Link href="/admin/users" className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-2xl border border-zinc-700 transition-colors">
                            <div className="font-bold mb-1">Citizens</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">User Database</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
