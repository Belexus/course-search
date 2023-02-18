import { useState } from "react";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Course } from "./pages/Course";
import { AppContextProvider } from "./context/AppContext";

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnMount: true,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Routes>
            <Route path="/" element={<Course />} />
          </Routes>
        </MantineProvider>
      </QueryClientProvider>
    </AppContextProvider>
  );
}
