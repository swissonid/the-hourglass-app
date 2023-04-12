import "./globals.css";
import { AuthProvider } from "@auth/auth.provider";
import { PreviewBanner } from "@components/preview-banner";

export const metadata = {
  title: "The Hourglass",
  description: "A app to track your work hours",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white ">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
