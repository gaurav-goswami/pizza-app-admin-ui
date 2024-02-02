import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {COLORS} from './styles/theme.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: COLORS.COLOR_PRIMARY,
            colorLink: COLORS.COLOR_PRIMARY,
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// TODO: 
// 1. add form to create restaurant
// 2. check the create user endpoint for setting tenant ID
// 3. add custom component for smaller devices (cannot access the application in smaller devices)
// 4. refactor code (User file)
