// src/app/page.js
import TwitchChecker from "@/components/TwitchChecker";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <TwitchChecker />
    </main>
  );
}
