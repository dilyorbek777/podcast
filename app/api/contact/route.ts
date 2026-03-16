import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, family, phone, message } = await req.json();

    // Kalitni o'qish: \n belgilarini haqiqiy yangi qatorga aylantiramiz
    const rawKey = process.env.GOOGLE_PRIVATE_KEY || '';
    const privateKey = rawKey.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Лист1!A2',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, family, phone, message, new Date().toLocaleString('uz-UZ')]],
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Google Sheets Xatosi:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}