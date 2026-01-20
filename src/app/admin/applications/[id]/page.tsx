'use client';

import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: session } = useSession();
    const router = useRouter();
    const [application, setApplication] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updating, setUpdating] = useState(false);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (session) {
            if ((session.user as any).role === 'citizen') {
                router.push('/dashboard');
                return;
            }

            const fetchApplication = async () => {
                try {
                    const res = await fetch(`/api/applications/${id}`);
                    if (!res.ok) throw new Error('Application not found');
                    const data = await res.json();
                    setApplication(data);
                    setComment(data.comments || '');
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchApplication();
        }
    }, [id, session, router]);

    const updateStatus = async (newStatus: string) => {
        setUpdating(true);
        try {
            const res = await fetch(`/api/applications/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus, comments: comment }),
            });

            if (res.ok) {
                const updated = await res.json();
                setApplication(updated);
            }
        } catch (err) {
            console.error('Failed to update status:', err);
        } finally {
            setUpdating(true);
            // Small delay to show state change
            setTimeout(() => setUpdating(false), 500);
        }
    };

    if (loading) return <div className="p-8 text-center py-24 animate-pulse text-zinc-400 font-medium">Retrieving Official Records...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
                        Review <span className="text-blue-600">Application</span>
                    </h1>
                    <p className="text-zinc-500">Official review portal for service request #{id.substring(id.length - 8)}</p>
                </div>
                <Link href="/admin/applications" className="text-blue-600 font-bold hover:underline">
                    &larr; Back to Queue
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* User Info */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-xl font-bold mb-6">Applicant Profile</h2>
                        <div className="flex items-center gap-6 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                                {application.userId?.name?.charAt(0)}
                            </div>
                            <div>
                                <div className="text-xl font-bold text-zinc-900 dark:text-white">{application.userId?.name}</div>
                                <div className="text-sm text-zinc-500">{application.userId?.email}</div>
                                <div className="mt-2 inline-flex px-3 py-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                                    Citizen UID: {application.userId?._id?.substring(0, 8)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Items */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h2 className="text-xl font-bold mb-6">Submission Data</h2>
                        <div className="space-y-6">
                            {Object.entries(application.formData || {}).map(([key, value]: [string, any]) => (
                                <div key={key} className="pb-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0 last:pb-0">
                                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">{key}</div>
                                    <div className="text-base text-zinc-900 dark:text-white font-medium">{value.toString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Action Card */}
                    <div className="bg-zinc-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[60px]"></div>
                        <h3 className="text-lg font-bold mb-6 relative z-10">Application Processing</h3>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Change Status</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {['pending', 'in-review', 'approved', 'rejected', 'completed'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updateStatus(status)}
                                            disabled={updating}
                                            className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${application.status === status
                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40'
                                                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Official Comments</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Enter review notes here..."
                                    className="w-full bg-zinc-800 border-zinc-700 rounded-xl text-sm p-4 text-white focus:ring-blue-500 focus:border-blue-500"
                                    rows={4}
                                />
                            </div>

                            <div className="text-[10px] text-zinc-500 italic">
                                Last updated: {new Date(application.updatedAt).toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Meta Data</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-500">Service</span>
                                <span className="font-bold text-zinc-900 dark:text-white">{application.serviceId?.name}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-500">Processing Fee</span>
                                <span className="font-bold text-zinc-900 dark:text-white">₹{application.serviceId?.fees}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-500">Submitted</span>
                                <span className="font-bold text-zinc-900 dark:text-white">{new Date(application.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
