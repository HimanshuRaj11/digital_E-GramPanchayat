'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { use } from 'react';

export default function Apply({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise);
    const { data: session } = useSession();
    const router = useRouter();
    const [service, setService] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [documents, setDocuments] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`/api/services/${params.id}`)
            .then((res) => res.json())
            .then((data) => setService(data.service));
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const docArray = Object.keys(documents).map((key) => ({
            name: key,
            url: documents[key], // In real app, upload to storage and get URL
        }));

        const res = await fetch('/api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serviceId: params.id,
                data: formData,
                documents: docArray,
            }),
        });

        if (res.ok) {
            router.push('/dashboard');
        } else {
            alert('Application failed');
        }
        setLoading(false);
    };

    if (!service) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-2xl font-bold">Apply for {service.name}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dynamic Form Fields based on service category or fixed for now */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 p-2"
                            onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 p-2"
                            onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                            }
                        />
                    </div>

                    {/* Required Documents */}
                    {service.requiredDocuments.map((doc: string) => (
                        <div key={doc}>
                            <label className="block text-sm font-medium text-gray-700">
                                {doc} (URL)
                            </label>
                            <input
                                type="text"
                                placeholder="Enter document URL"
                                required
                                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                                onChange={(e) =>
                                    setDocuments({ ...documents, [doc]: e.target.value })
                                }
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
                    >
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
}
