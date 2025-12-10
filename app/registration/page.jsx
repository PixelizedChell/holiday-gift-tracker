'use client'
import { SignUp, useUser } from '@clerk/nextjs';

export default function Page() {
    const { isSignedIn } = useUser()
    if (!isSignedIn)
        return (
            <SignUp />
        );
}