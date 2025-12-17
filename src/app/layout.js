import { GameProvider } from "@/contexts/GameContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
