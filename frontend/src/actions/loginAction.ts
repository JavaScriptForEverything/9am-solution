import { redirect } from 'react-router-dom'

export const loginAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const fields = Object.fromEntries(formData)
	console.log(fields)

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Optional: needed if you're using cookies
      body: JSON.stringify(fields),
    });

    if (!res.ok) {
      const error = await res.json();
      // return json({ error: error.message || "Login failed" }, { status: res.status });
			return error
    }

    // Success: redirect to dashboard
    return redirect("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    // return json({ error: "Something went wrong, try again later." }, { status: 500 });
		return err
  }
}

