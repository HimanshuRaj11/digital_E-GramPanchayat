export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    About Digital E-Gram Panchayat
                </h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 space-y-6">
                    <p className="text-gray-700 text-lg">
                        Digital E-Gram Panchayat is a revolutionary platform designed to bridge the gap between rural citizens and local governance. Our mission is to digitize Gram Panchayat services, making them accessible, transparent, and efficient for everyone.
                    </p>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h2>
                        <p className="text-gray-600">
                            To empower every rural citizen with digital access to government services, eliminating the need for physical visits and reducing bureaucratic delays.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Key Features</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Online Service Applications</li>
                            <li>Real-time Application Tracking</li>
                            <li>Transparent Workflow</li>
                            <li>Digital Record Keeping</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
