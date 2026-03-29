"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SyncUser() {
  const { user } = useUser();
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (!user) return;

    createUser({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress!,
      fullName: user.fullName ?? undefined,
      username: user.username ?? undefined,
    });
  }, [user, createUser]);

  return null;
}