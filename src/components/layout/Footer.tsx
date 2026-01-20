import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-zinc-900 text-white pt-16 pb-8 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                GOI
                            </div>
                            <span className="text-xl font-bold">
                                E-Gram <span className="text-blue-500">Panchayat</span>
                            </span>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Empowering rural India through digital transformation. Access all Gram Panchayat services at your fingertips.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/services" className="text-zinc-400 hover:text-white transition-colors">All Services</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">Contact Support</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Department Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Departments</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Revenue Department</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Health & Welfare</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Education Section</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Social Justice</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-zinc-400 text-sm">
                            <li className="flex items-start space-x-3">
                                <svg className="h-5 w-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Digital Building, North Block, New Delhi - 110001</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>support@egram-panchayat.gov.in</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>1800-123-4567 (Toll Free)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-zinc-500 text-xs">
                        © {new Date().getFullYear()} Digital E-Gram Panchayat. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-xs text-zinc-500">
                        <span>Designed & Developed by NIC</span>
                        <span>Government of India</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
