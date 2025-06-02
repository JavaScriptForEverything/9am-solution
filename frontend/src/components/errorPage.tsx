

// src/components/ErrorPage.tsx
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="p-10 text-center text-red-600">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p>{(error as any)?.message || "Unknown error"}</p>
    </div>
  );
}
