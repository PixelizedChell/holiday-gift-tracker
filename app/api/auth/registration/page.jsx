'use client'
import { SignOutButton, SignUp, useUser } from '@clerk/nextjs';

export default function Page() {
    const { isSignedIn } = useUser()
    if (!isSignedIn) {
        return (
            <SignUp />
        )
    } else {
        <div>
            <h1>You are already signed in.</h1>
            <SignOutButton />
        </div>
    }
}