import { Setting } from "@/pages/dashboard/setting"

export const userRoutes = {
  path: "user",
  children: [
    {
      path: "profile",
      element: <Setting />,
      handle: { breadcrumb: "profile", sidebar: "profile" },
    },
    {
      path: "setting",
      element: <Setting />,
      handle: { breadcrumb: "setting", sidebar: "setting" },
    },
  ],
};
