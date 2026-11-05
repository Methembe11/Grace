import "./globals.css";

export const metadata = {
  title: "For My Bumblebee 🐝 | A Birthday Surprise",
  description: "A little birthday gift for Grace, made with love, laughter and friendship.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
