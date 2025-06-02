import { createBrowserRouter } from "react-router-dom"
import { requireAuth } from "@/utils/requireAuth"
import MainLayout from "@/layouts/mainLayout"
import ErrorPage from "@/components/errorPage"

import { dashboardRoutes } from '@/routes/dashboardRoutes'
import { authRoutes } from './authRoutes'

export const router = createBrowserRouter([
  {
    path: "/",
    loader: requireAuth,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      dashboardRoutes,
      // userRoutes,
    ],
  },
	authRoutes
])
