import type { Metadata } from 'next';
import TanStackProvider from '@/app/components/TanStackProvider/TanStackProvider';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import './globals.css';

export const metadata: Metadata = { title: 'NoteHub' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}