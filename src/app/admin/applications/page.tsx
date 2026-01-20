'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminApplications() {
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

    const updateStatus = async (id: string, newStatus: string) => {
        const res = await fetch(`/api/applications/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus, comment: 'Status updated by official' }),
        });

        if (res.ok) {
            setApplications((prev: any) =>
                prev.map((app: any) =>
                    app._id === id ? { ...app, status: newStatus } : app
                )
            );
        }
    };

    if (loading) {
        return <div className="p-8 text-center animate-pulse">Loading Applications...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
                    Manage <span className="text-blue-600">Applications</span>
                </h1>
                <p className="text-lg text-zinc-500 dark:text-zinc-400">
                    Official portal for reviewing and processing Panchayat service requests.
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Applicant</th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Service</th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-zinc-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                            {applications.map((app: any) => (
                                <tr key={app._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-zinc-900 dark:text-white">{app.userId?.name}</div>
                                        <div className="text-[10px] text-zinc-400">{app.userId?.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">{app.serviceId?.name}</div>
                                        <div className="text-[10px] text-zinc-400">{new Date(app.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${app.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                app.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={app.status}
                                            onChange={(e) => updateStatus(app._id, e.target.value)}
                                            className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-review">In Review</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {applications.length === 0 && (
                    <div className="py-12 text-center text-zinc-500">No applications found.</div>
                )}
            </div>
        </div>
    );
}
