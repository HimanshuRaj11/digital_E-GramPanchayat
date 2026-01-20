'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserManagement() {
    const { data: session } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            if ((session.user as any).role !== 'admin') {
                router.push('/admin');
                return;
            }

            // Mocking user fetch for now as there might not be a dedicated endpoint for all users
            // In a real app, you'd have /api/admin/users
            fetch('/api/auth/session') // Just a placeholder check
                .then(() => {
                    setLoading(false);
                    // Mock data
                    setUsers([
                        { id: '1', name: 'Admin User', email: 'admin@panchayat.gov.in', role: 'admin' },
                        { id: '2', name: 'Village Officer', email: 'officer@panchayat.gov.in', role: 'officer' },
                        { id: '3', name: 'Citizen User', email: 'citizen@panchayat.gov.in', role: 'citizen' },
                    ]);
                });
        }
    }, [session, router]);

    if (loading) return <div className="p-8 text-center animate-pulse">Loading Users...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
                    User <span className="text-blue-600">Management</span>
                </h1>
                <p className="text-lg text-zinc-500 dark:text-zinc-400">
                    Control portal access and manage staff roles.
                </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden text-zinc-900 dark:text-white p-8">
                <div className="text-center py-12">
                    <svg className="w-16 h-16 text-zinc-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">Advanced User Management</h3>
                    <p className="text-zinc-500 max-w-md mx-auto">This feature is currently being integrated with the secure backend vault.</p>
                </div>
            </div>
        </div>
    );
}
