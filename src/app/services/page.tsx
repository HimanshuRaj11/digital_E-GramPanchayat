'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('/api/services')
            .then((res) => res.json())
            .then((data) => setServices(data.services || []));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-3xl font-bold text-gray-800">
                    Available Services
                </h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service: any) => (
                        <div
                            key={service._id}
                            className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                        >
                            <h2 className="mb-2 text-xl font-semibold text-blue-600">
                                {service.name}
                            </h2>
                            <p className="mb-4 text-gray-600">{service.description}</p>
                            <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                                <span>Fees: ₹{service.fees}</span>
                                <span>Time: {service.processingTime}</span>
                            </div>
                            <Link
                                href={`/services/${service._id}/apply`}
                                className="block w-full rounded-md bg-blue-600 py-2 text-center text-white hover:bg-blue-700"
                            >
                                Apply Now
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
