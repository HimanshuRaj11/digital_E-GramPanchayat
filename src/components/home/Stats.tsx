const stats = [
    { label: "Applications Processed", value: "1,200+" },
    { label: "Active Services", value: "50+" },
    { label: "Registered Citizens", value: "5,000+" },
    { label: "Villages Covered", value: "10" },
];

const Stats = () => {
    return (
        <div className="bg-white dark:bg-zinc-900 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Trusted by the Community
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            We are committed to providing efficient and transparent services to all citizens.
                        </p>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col bg-gray-50 dark:bg-zinc-800 p-8">
                                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-blue-600 dark:text-blue-400">
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Stats;
