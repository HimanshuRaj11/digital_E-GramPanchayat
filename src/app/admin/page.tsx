'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
                });
        }
    }, [session, router]);

    const updateStatus = async (id: string, newStatus: string) => {
        const res = await fetch(`/api/applications/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus, comment: 'Status updated' }),
        });

        if (res.ok) {
            setApplications((prev: any) =>
                prev.map((app: any) =>
                    app._id === id ? { ...app, status: newStatus } : app
                )
            );
        } else {
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Admin Dashboard ({session?.user?.name} - {(session?.user as any).role})
                    </h1>
                    {['officer', 'admin'].includes((session?.user as any).role) && (
                        <button
                            onClick={() => router.push('/admin/services/new')}
                            className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        >
                            Create New Service
                        </button>
                    )}
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-gray-700">
                        All Applications
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Applicant
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Service
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {applications.map((app: any) => (
                                    <tr key={app._id}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {app.userId?.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {app.serviceId?.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${app.status === 'approved'
                                                        ? 'bg-green-100 text-green-800'
                                                        : app.status === 'rejected'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                            >
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                            <select
                                                value={app.status}
                                                onChange={(e) => updateStatus(app._id, e.target.value)}
                                                className="rounded border border-gray-300 p-1"
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
                </div>
            </div>
        </div>
    );
}
