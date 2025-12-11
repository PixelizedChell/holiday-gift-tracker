'use client'
import { SignIn, useUser } from '@clerk/nextjs';

export default function Page() {
    const { isSignedIn } = useUser()
    if (!isSignedIn) {
        return (
            <SignIn />
        )
    }
}