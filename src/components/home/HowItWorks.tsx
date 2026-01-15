const steps = [
    {
        id: 1,
        title: "Register",
        description: "Create an account with your basic details to get started.",
        icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        id: 2,
        title: "Select Service",
        description: "Browse through our list of services and choose the one you need.",
        icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        ),
    },
    {
        id: 3,
        title: "Apply Online",
        description: "Fill out the application form and upload necessary documents.",
        icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        id: 4,
        title: "Track Status",
        description: "Monitor the progress of your application in real-time.",
        icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

const HowItWorks = () => {
    return (
        <div className="bg-gray-50 dark:bg-zinc-800 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        How It Works
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Get your certificates and services in 4 simple steps.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center text-center">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600">
                                    {step.icon}
                                </div>
                                <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                    {step.title}
                                </dt>
                                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                    <p className="flex-auto">{step.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
