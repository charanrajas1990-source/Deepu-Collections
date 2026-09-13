import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Deepu's Collection",
  description: "Handcrafted Elegance, Tailored for You",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Great+Vibes&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/tailwind.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
