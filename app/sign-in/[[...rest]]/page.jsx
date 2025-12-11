'use client'
import { SignIn, SignOutButton, useUser } from '@clerk/nextjs';

export default function Page() {
    const { isSignedIn } = useUser()
    if (!isSignedIn) {
        return (
            <SignIn />
        )
    } else {
        return (
            <div>You are already signed in.<br /><a><SignOutButton /></a></div>
        )
    }
}