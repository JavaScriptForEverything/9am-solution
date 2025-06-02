
// src/layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
	// const data = useLoaderData()
	// console.log(data)
	// throw 'error'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet context={{}} />
    </div>
  );
}
