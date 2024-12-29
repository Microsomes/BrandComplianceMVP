import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

export default function Phones() {
    const { phones } = usePage().props;

    // State to manage modal visibility and selected phone data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhone, setSelectedPhone] = useState(null);
    const [totalCost, setTotalCost] = useState(0);

    // Handle opening the modal and setting selected phone data
    const handleOpenModal = (phone) => {
        setSelectedPhone(phone);
        setIsModalOpen(true);
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPhone(null);
    };

    // Close modal when clicking outside
    const handleClickOutside = (e) => {
        if (e.target.id === 'modal-background') {
            handleCloseModal();
        }
    };

    // Calculate the total cost of ownership for the selected plan
    const calculateTotalCost = (plans) => {
        const total = plans.reduce((acc, plan) => {
            return acc + (parseFloat(plan.monthly) * plan.contract_length) + parseFloat(plan.upfront);
        }, 0);
        setTotalCost(total.toFixed(2)); // Format to 2 decimal places
    };

    useEffect(() => {
        if (selectedPhone) {
            // Recalculate total cost whenever selectedPhone or its plans change
            calculateTotalCost(selectedPhone.combinations.flatMap(c => c.plans));
        }
    }, [selectedPhone]);

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
                                            className="flex items-center flex-col justify-between text-sm text-gray-500 dark:text-gray-400 mt-2"
                                        >
                                            <p className='text-2xl text-center mb-2'>{combination.color} - {combination.storage}</p>
                                            <button
                                                onClick={() => handleOpenModal(phone)}
                                                className="px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded hover:bg-gradient-to-l transition duration-300"
                                            >
                                                View  ({combination.plans.length} plans)
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {isModalOpen && selectedPhone && (
                    <Transition
                        show={isModalOpen}
                        enter="transition transform ease-out duration-500"
                        enterFrom="translate-y-4 opacity-0"
                        enterTo="translate-y-0 opacity-100"
                        leave="transition transform ease-in duration-300"
                        leaveFrom="translate-y-0 opacity-100"
                        leaveTo="translate-y-4 opacity-0"
                    >
                        <div 
                            id="modal-background" 
                            onClick={handleClickOutside}
                            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
                        >
                            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 rounded-lg w-11/12 md:w-1/2 p-6 max-h-[80vh] overflow-y-auto">
                                <h2 className="text-xl font-semibold text-white">
                                    Plans for {selectedPhone.name}
                                </h2>
                                <p className="mt-2 text-gray-300">Total Cost of Ownership: £{totalCost}</p>
                                <div className="mt-4">
                                    {selectedPhone.combinations.map((combination) => (
                                        <div key={combination.id} className="mt-4">
                                            <h3 className="text-lg font-semibold text-white">
                                                {combination.color} - {combination.storage}
                                            </h3>
                                            {combination.plans.map((plan) => (
                                                <div
                                                    key={plan.id}
                                                    className="bg-gray-700 p-4 rounded-lg mt-2 shadow-lg transform hover:scale-105 transition duration-300"
                                                >
                                                    <p className="text-white">Monthly: £{plan.monthly}</p>
                                                    <p className="text-white">Upfront: £{plan.upfront}</p>

                                                    <p className="text-white">Network: {plan.network}</p>

                                                    <p className="text-gray-300">Minutes: {plan.minutes}</p>
                                                    <p className="text-gray-300">Text: {plan.texts}</p>
                                                    <p className="text-gray-300">Data Allowance: {plan.data_allowance}</p>
                                                    <p className="text-gray-300">Contract Length: {plan.contract_length} months</p>
                                                    <a target='_blank' href={plan.url+"/deals"} >Go to Deal</a>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={handleCloseModal}
                                    className="mt-4 text-white bg-red-600 rounded py-2 px-4 hover:bg-red-500 transition duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </Transition>
                )}
            </main>
        </div>
    );
}
