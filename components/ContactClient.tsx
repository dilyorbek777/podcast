'use client';

import { useState } from 'react';


export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            family: formData.get('family'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', { // Ensure this matches your route path
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Xatolik yuz berdi. Qayta urinib ko‘ring.');

            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message);
        }
    }

    return (
        <main className="max-w-xl mx-auto p-6 flex-col flex items-center justify-center h-screen w-full">
            <h1 className="mb-6 text-center text-primary text-5xl font-bold my-12 max-md:my-16">Contact Us</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input name="name" type="text" required className="w-full border-primary-400 outline-none px-5 py-3 text-white border rounded-sd " placeholder="John" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Surname</label>
                        <input name="family" type="text" required className="w-full border-primary-400 outline-none px-5 py-3 text-white border rounded-sd " placeholder="Doe" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Number</label>
                    <input name="phone" type="tel" required className="w-full border-primary-400 outline-none px-5 py-3 text-white border rounded-sd " placeholder="+998 90 123 45 67" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea name="message" required rows={4} className="w-full  border-primary-400 outline-none px-5 py-3 text-white border resize-none rounded-sd " placeholder="Type your message here..." />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-primary-400 text-white py-3 px-5 rounded-sd hover:bg-primary-600 disabled:bg-gray-400 transition"
                >
                    {status === 'loading' ? 'Sending...' : 'Send'}
                </button>

                {status === 'success' && (
                    <p className="text-green-600 font-medium text-center mt-2">Sent successfully!</p>
                )}

                {status === 'error' && (
                    <p className="text-red-600 font-medium text-center mt-2">{errorMessage}</p>
                )}
            </form>
        </main>
    );
}