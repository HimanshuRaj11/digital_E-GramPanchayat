'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewServicePage() {
    interface ServiceFormData {
        name: string;
        description: string;
        category: string;
        fees: number;
        processingTime: string;
        requiredDocuments: string;
    }

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<ServiceFormData>({
        name: '',
        description: '',
        category: '',
        fees: 0,
        processingTime: '',
        requiredDocuments: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'fees' ? parseFloat(value) || 0 : value,
        } as ServiceFormData));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                requiredDocuments: formData.requiredDocuments
                    .split(',')
                    .map((doc) => doc.trim())
                    .filter((doc) => doc !== ''),
            };

            const res = await fetch('/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create service');
            }

            router.push('/admin/services');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">Add New Service</h1>
                <Link href="/admin/services" className="text-blue-600 hover:text-blue-800">
                    &larr; Back to Services
                </Link>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Service Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="">Select a category</option>
                        <option value="Certificates">Certificates</option>
                        <option value="Licenses">Licenses</option>
                        <option value="Social Welfare">Social Welfare</option>
                        <option value="Taxes">Taxes</option>
                        <option value="Utility">Utility</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        required
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="fees" className="block text-sm font-medium text-gray-700 mb-1">
                            Fees (₹)
                        </label>
                        <input
                            type="number"
                            id="fees"
                            name="fees"
                            min="0"
                            required
                            value={formData.fees}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="processingTime" className="block text-sm font-medium text-gray-700 mb-1">
                            Processing Time
                        </label>
                        <input
                            type="text"
                            id="processingTime"
                            name="processingTime"
                            placeholder="e.g. 7 days"
                            required
                            value={formData.processingTime}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="requiredDocuments" className="block text-sm font-medium text-gray-700 mb-1">
                        Required Documents (comma separated)
                    </label>
                    <textarea
                        id="requiredDocuments"
                        name="requiredDocuments"
                        rows={3}
                        placeholder="e.g. Aadhar Card, Pan Card, Address Proof"
                        value={formData.requiredDocuments}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate multiple documents with commas.</p>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Service'}
                    </button>
                </div>
            </form>
        </div>
    );
}
