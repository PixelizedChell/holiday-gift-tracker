'use client'
import { SignOutButton, SignUp, useUser } from '@clerk/nextjs';

export default function Page() {
    const { isSignedIn } = useUser()
    if (!isSignedIn) {
        return (
            <SignUp />
        )
    } else {
        return (
            <div>You are already signed in.<br /><a href="/sign-out"><SignOutButton /></a></div>
        )
    }
}