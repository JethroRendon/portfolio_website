import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

const deploymentHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;
const metadataBase = deploymentHost
  ? new URL(
      deploymentHost.includes('://')
        ? deploymentHost
        : `https://${deploymentHost}`,
    )
  : undefined;
const socialImage = metadataBase ? new URL('/og.png', metadataBase) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: 'Jethro Rendon — Creative Developer & Digital Explorer',
  description:
    'A field journal of expressive interfaces, production-grade code, travel traces, and selected digital work.',
  openGraph: {
    title: 'Jethro Rendon — Creative Developer & Digital Explorer',
    description:
      'Selected work, code signals, and travel traces from a nearby universe.',
    type: 'website',
    images: socialImage
      ? [
          {
            url: socialImage,
            width: 1200,
            height: 630,
            alt: 'Jethro Rendon — Creative developer and digital explorer',
          },
        ]
      : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jethro Rendon — Creative Developer & Digital Explorer',
    description:
      'Selected work, code signals, and travel traces from a nearby universe.',
    images: socialImage ? [socialImage] : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
