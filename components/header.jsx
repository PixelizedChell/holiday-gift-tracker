import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Gift Tracker', href: '/tracker' },
    { linkText: 'Giftees', href: '/giftees' }, //todo
    { linkText: 'Registration', href: '/api/auth/registration' }, //todo
    { linkText: 'Login', href: '/api/auth/signin' } //todo
];

export function Header() {
    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-12 sm:pt-12 md:pb-24">
            <Link href="/">
            </Link>
            {!!navItems?.length && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href} className="inline-flex px-1.5 py-1 sm:px-3 sm:py-2">
                                {item.linkText}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <UserButton />
        </nav>
    );
}
