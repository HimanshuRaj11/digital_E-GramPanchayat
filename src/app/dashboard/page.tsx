'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
    const { data: session } = useSession();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        if (session) {
            fetch('/api/applications')
                .then((res) => res.json())
                .then((data) => setApplications(data.applications || []));
        }
    }, [session]);

    if (!session) {
        return <div className="p-8">Please login to view dashboard.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome, {session.user?.name}
                    </h1>
                    <Link
                        href="/services"
                        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Browse Services
                    </Link>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold text-gray-700">
                        My Applications
                    </h2>
                    {applications.length === 0 ? (
                        <p className="text-gray-500">No applications found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Service
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {applications.map((app: any) => (
                                        <tr key={app._id}>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {app.serviceId?.name || 'Unknown Service'}
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
                                            <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                                                {new Date(app.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
