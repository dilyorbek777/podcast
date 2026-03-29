import { NextRequest, NextResponse } from "next/server";
import { convex } from "@/lib/convex";
import { api } from "@/convex/_generated/api";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscription = await convex.query(api.newsletter.getByEmail, { email });
    
    if (existingSubscription) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 409 }
      );
    }

    // Add new subscription
    await convex.mutation(api.newsletter.subscribe, {
      email,
      subscribedAt: Date.now(),
    });

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
