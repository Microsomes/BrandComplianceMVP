export default function ApplicationLogo(props) {
    return (
        <div
            {...props}
            className="flex items-center justify-center h-16 w-64 bg-gradient-to-r from-gray-900 to-gray-700 rounded-md shadow-md border border-gray-800 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-10 blur-lg"></div>
            <span className="relative text-2xl font-extrabold tracking-wide text-gray-100">
                BRAND
            </span>
            <span className="relative text-lg font-medium tracking-wide text-indigo-400 ml-2">
                COMPLIANCE
            </span>
        </div>
    );
}
