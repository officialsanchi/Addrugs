import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./lib/router.tsx";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import "primeicons/primeicons.css";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          limit={1}
          hideProgressBar
          newestOnTop={true}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
        />

        <App />
        <RouterProvider router={router} />
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>
);
