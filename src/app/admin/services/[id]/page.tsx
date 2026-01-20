'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ServiceFormData {
    name: string;
    description: string;
    category: string;
    fees: number;
    processingTime: string;
    requiredDocuments: string;
    isActive: boolean;
}

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<ServiceFormData>({
        name: '',
        description: '',
        category: '',
        fees: 0,
        processingTime: '',
        requiredDocuments: '',
        isActive: true,
    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await fetch(`/api/services/${id}`);
                if (!res.ok) throw new Error('Service not found');
                const data = await res.json();

                setFormData({
                    name: data.name || '',
                    description: data.description || '',
                    category: data.category || '',
                    fees: data.fees || 0,
                    processingTime: data.processingTime || '',
                    requiredDocuments: Array.isArray(data.requiredDocuments)
                        ? data.requiredDocuments.join(', ')
                        : '',
                    isActive: data.isActive !== undefined ? data.isActive : true,
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : name === 'fees'
                    ? parseFloat(value) || 0
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            const payload = {
                ...formData,
                requiredDocuments: formData.requiredDocuments
                    .split(',')
                    .map((doc) => doc.trim())
                    .filter((doc) => doc !== ''),
            };

            const res = await fetch(`/api/services/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to update service');
            }

            router.push('/admin/services');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-500 font-medium">Loading service specifications...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2">
                        Configure <span className="text-blue-600">Service</span>
                    </h1>
                    <p className="text-zinc-500">Edit parameters for #{id.substring(id.length - 8)}</p>
                </div>
                <Link href="/admin/services" className="inline-flex items-center text-sm font-bold text-zinc-500 hover:text-blue-600 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return to Catalog
                </Link>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-2xl border border-red-100 dark:border-red-900/30 mb-8 animate-in zoom-in-95 duration-300">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-bold">Error:</span> {error}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                {/* Main Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                                Service Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter service title"
                                className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="category" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium appearance-none"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Certificates">Certificates</option>
                                    <option value="Licenses">Licenses</option>
                                    <option value="Social Welfare">Social Welfare</option>
                                    <option value="Taxes">Taxes</option>
                                    <option value="Utility">Utility</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="processingTime" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                                    Processing Time
                                </label>
                                <input
                                    type="text"
                                    id="processingTime"
                                    name="processingTime"
                                    required
                                    value={formData.processingTime}
                                    onChange={handleChange}
                                    placeholder="e.g. 7-10 Days"
                                    className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                                Service Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                rows={5}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Details about this service..."
                                className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium resize-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="requiredDocuments" className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                                Required Documents
                            </label>
                            <textarea
                                id="requiredDocuments"
                                name="requiredDocuments"
                                rows={3}
                                value={formData.requiredDocuments}
                                onChange={handleChange}
                                placeholder="Aadhar Card, Pan Card, etc. (comma separated)"
                                className="w-full px-5 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                            />
                            <p className="mt-3 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Separate items with commas</p>
                        </div>
                    </form>
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-8">
                    <div className="bg-zinc-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                        <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
                        <h3 className="text-lg font-bold mb-8 relative z-10">Deployment</h3>

                        <div className="space-y-8 relative z-10">
                            <div>
                                <label htmlFor="fees" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
                                    Processing Fees (₹)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">₹</span>
                                    <input
                                        type="number"
                                        id="fees"
                                        name="fees"
                                        min="0"
                                        required
                                        value={formData.fees}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-bold text-xl"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Public visibility</div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:巷[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-5 px-6 rounded-2xl font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        <span>Saving Changes...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Publish Updates</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Audit Log</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-500 font-bold uppercase tracking-widest">Created</span>
                                <span className="font-bold text-zinc-900 dark:text-zinc-200">2 months ago</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-zinc-500 font-bold uppercase tracking-widest">By</span>
                                <span className="font-bold text-zinc-900 dark:text-zinc-200">System Root</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
