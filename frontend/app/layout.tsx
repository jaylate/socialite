import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-100 dark:bg-neutral-800">
        {children}
      </body>
    </html>
  );
}
