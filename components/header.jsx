'use client'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export function Header() {
    const { isSignedIn, user } = useUser()
    const username = user?.username;
    const firstName = user?.firstName
    const navItems = isSignedIn ? [
        { linkText: 'Home', href: '/' },
        { linkText: 'Giftees', href: '/giftees' },
        { linkText: 'Holidays', href: '/holidays'},
        { linkText: 'Add Gift', href: '/addgift'},
    ] : [
        { linkText: 'Home', href: '/' },
        { linkText: 'Registration', href: '/sign-up' },
        { linkText: 'Login', href: '/sign-in' }
    ];
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
        {isSignedIn && user && (
            <div className='items-right'>
                <b>Hello{" " + firstName || " " + username || ""}!</b>
                <UserButton />
                <Link href="" className="inline-flex px-1.5 py-1 sm:px-3 sm:py-2"><SignOutButton /></Link>
            </div>
        )}
        </nav>
    );
}
