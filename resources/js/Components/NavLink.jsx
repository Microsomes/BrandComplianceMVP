import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-600 text-white focus:border-indigo-500'
                    : 'border-transparent text-gray-400 hover:border-gray-500 hover:text-white focus:border-gray-500 focus:text-white') +
                className
            }
        >
            {children}
        </Link>
    );
}
