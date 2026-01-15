export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    Contact Us
                </h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
                            <p className="text-gray-600 mb-4">
                                Have questions or need assistance? Reach out to your local Gram Panchayat office or contact our support team.
                            </p>

                            <div className="space-y-3 text-gray-600">
                                <p>
                                    <strong>Address:</strong><br />
                                    Gram Panchayat Office,<br />
                                    Village Name, District,<br />
                                    State, PIN Code
                                </p>
                                <p>
                                    <strong>Email:</strong><br />
                                    support@egrampanchayat.gov.in
                                </p>
                                <p>
                                    <strong>Phone:</strong><br />
                                    +91 12345 67890
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Send a Message</h2>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"></textarea>
                                </div>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
