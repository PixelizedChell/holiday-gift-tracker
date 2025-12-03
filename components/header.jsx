import Image from 'next/image';
import Link from 'next/link';
import netlifyLogo from 'public/netlify-logo.svg';
import { neon } from '@netlify/neon';

const navItems = [
    { linkText: 'Home', href: '/' },
    { linkText: 'Gift Tracker', href: '/tracker' }, //todo
    { linkText: 'Giftees', href: '/giftees'}, //todo
    { linkText: 'Registration', href: '/registration'}, //todo
    { linkText: 'Login', href: '/login'} //todo
];
const sql = neon(); // automatically uses env NETLIFY_DATABASE_URL

// const test = await sql`SELECT * FROM playing_with_neon`;
export function Header() {
    return (
        <nav className="flex flex-wrap items-center gap-4 pt-6 pb-12 sm:pt-12 md:pb-24">
            <Link href="/">
                <Image src={netlifyLogo} alt="Netlify logo" />
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
        </nav>
    );
}
