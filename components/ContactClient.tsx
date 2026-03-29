'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
        <main className="max-w-xl mx-auto p-6  relative flex-col flex items-center justify-center h-screen w-full">
              <h1 className="mb-6 text-center text-primary text-5xl font-bold my-12 max-md:my-16">Contact Us</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" type="text" required placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="family">Surname</Label>
                        <Input id="family" name="family" type="text" required placeholder="Doe" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Number</Label>
                    <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        required 
                        placeholder="+998 90 123 45 67"
                        pattern="^\+998.*"
                        title="Phone number must start with +998"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" required rows={4} placeholder="Type your message here..." />
                </div>

                <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full"
                >
                    {status === 'loading' ? 'Sending...' : 'Send'}
                </Button>

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