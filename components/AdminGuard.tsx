"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = useUser();
    const router = useRouter();

    const dbUser = useQuery(
        api.users.getUserByClerkId,
        user ? { clerkId: user.id } : "skip"
    );

    useEffect(() => {
        if (!dbUser) return;

        if (dbUser.role !== "admin") {
            router.replace("/");
        }
    }, [dbUser, router]);

    if (!dbUser) return null;

    return <>{children}</>;
}