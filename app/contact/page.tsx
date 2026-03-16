import ContactPage from '@/components/ContactClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with us for any inquiries. Fill out our contact form and we will get back to you as soon as possible.',
    openGraph: {
        title: 'Contact Us',
        description: 'Send us a message via our Google Sheets integrated contact form.',
        type: 'website',
    },
};

export default function ContactLayout() {
    return <><ContactPage /></>;
}