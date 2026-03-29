import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  try {
    const { name, family, phone, message } = await req.json();

    // Save to Convex
    await convex.mutation(api.contacts.createContact, {
      name,
      family,
      phone,
      message,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Contact API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}