'use client';

const announcements = [
    "New Service: Online Birth Certificate Application is now live.",
    "Gram Sabha meeting scheduled for 15th August.",
    "Property Tax payment deadline extended to 30th September.",
    "Free health checkup camp at the Community Hall on Sunday.",
];

const Announcements = () => {
    return (
        <div className="bg-blue-600 text-white py-2 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <span className="font-bold bg-blue-800 px-2 py-1 rounded text-xs sm:text-sm mr-4 z-10">
                    LATEST NEWS
                </span>
                <div className="flex-1 overflow-hidden relative h-6">
                    <div className="animate-marquee whitespace-nowrap absolute top-0 left-0">
                        {announcements.map((announcement, index) => (
                            <span key={index} className="mx-8 text-sm sm:text-base">
                                {announcement}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Announcements;
