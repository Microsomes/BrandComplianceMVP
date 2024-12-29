import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Phones() {
    const { phones } = usePage().props;

    useEffect(() => {
        console.log("Phones data:", phones);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Head title="Phones" />
            <header className="py-6 bg-blue-600 dark:bg-blue-800 shadow-lg">
                <h1 className="text-center text-3xl font-bold text-white animate-fadeInUp">
                    All Phones (Monthly) - Carphone Warehouse
                </h1>
            </header>

            <main className="px-6 py-8">
                <p className="text-center text-lg mb-8 animate-fadeIn text-gray-700 dark:text-gray-300">
                    I created this simple website as part of the BrightData Web Scraping Challenge I found on dev.to.
                </p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {phones.map((phone) => (
                        <div
                            key={phone.id}
                            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {phone.name}
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{phone.price}</p>

                                <div className="mt-4">
                                    {phone.combinations.map((combination) => (
                                        <div
                                            key={combination.id}
                                            className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2"
                                        >
                                            <p>{combination.color} - {combination.storage}</p>
                                            <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 rounded hover:bg-blue-500 dark:hover:bg-blue-600 transition duration-300">
                                                View All Plans
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
