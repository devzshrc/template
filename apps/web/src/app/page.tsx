import { ApiStatus } from "@/components/api-status";

export default function Home() {
  return (
    <main>
      <h1>Monorepo starter</h1>
      <p>Next.js frontend, Hono API server, and shared tRPC types.</p>
      <ApiStatus />
    </main>
  );
}
