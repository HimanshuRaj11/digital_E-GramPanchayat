'use client';

import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: session } = useSession();
    const [application, setApplication] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (session) {
            const fetchApplication = async () => {
                try {
                    const res = await fetch(`/api/applications/${id}`);
                    if (!res.ok) throw new Error('Application not found');
                    const data = await res.json();
                    setApplication(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchApplication();
        }
    }, [id, session]);

    if (!session) return <div className="p-8 text-center">Please login to view details.</div>;
    if (loading) return <div className="p-8 text-center">Loading application details...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
                        Application <span className="text-blue-600">Details</span>
                    </h1>
                    <p className="text-zinc-500">Track and manage your service request.</p>
                </div>
                <Link href="/dashboard/applications" className="text-blue-600 font-bold hover:underline">
                    &larr; Back to History
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* Status Card */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">Current Status</h2>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${application.status === 'approved' ? 'bg-green-100 text-green-700' :
                                    application.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                        'bg-blue-100 text-blue-700'
                                }`}>
                                {application.status}
                            </span>
                        </div>

                        <div className="relative pl-8 border-l-2 border-zinc-100 dark:border-zinc-800 space-y-12">
                            <div className="relative">
                                <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-zinc-900 shadow-sm"></div>
                                <div className="font-bold text-zinc-900 dark:text-white">Application Submitted</div>
                                <div className="text-xs text-zinc-400">{new Date(application.createdAt).toLocaleString()}</div>
                                <p className="text-sm text-zinc-500 mt-2">Your application for {application.serviceId?.name} has been received.</p>
                            </div>

                            {application.updatedAt !== application.createdAt && (
                                <div className="relative">
                                    <div className={`absolute -left-[41px] top-0 w-4 h-4 rounded-full border-4 border-white dark:border-zinc-900 shadow-sm ${application.status === 'approved' ? 'bg-green-600' :
                                            application.status === 'rejected' ? 'bg-red-600' : 'bg-blue-600 active:pulse'
                                        }`}></div>
                                    <div className="font-bold text-zinc-900 dark:text-white">Status Updated: {application.status}</div>
                                    <div className="text-xs text-zinc-400">{new Date(application.updatedAt).toLocaleString()}</div>
                                    {application.comments && (
                                        <div className="mt-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">"{application.comments}"</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Data Preview */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-xl font-bold mb-6">Submitted Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {Object.entries(application.formData || {}).map(([key, value]: [string, any]) => (
                                <div key={key}>
                                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">{key}</div>
                                    <div className="text-sm font-bold text-zinc-900 dark:text-white">{value.toString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-zinc-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[60px]"></div>
                        <h3 className="text-lg font-bold mb-4">Service Info</h3>
                        <div className="text-2xl font-extrabold mb-1">{application.serviceId?.name}</div>
                        <div className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">{application.serviceId?.category}</div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Fees Paid</span>
                                <span className="font-bold">₹{application.serviceId?.fees}</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Ref ID</span>
                                <span className="text-xs font-mono">{application._id.substring(application._id.length - 12)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Need Help?</h3>
                        <p className="text-sm text-zinc-400 mb-6">If you have any questions regarding your application, please contact the Panchayat helpdesk.</p>
                        <Link href="/contact" className="block text-center py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-sm hover:bg-zinc-200 transition-colors">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
