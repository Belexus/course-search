import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { Course } from "./pages/Course";

import { useState } from "react";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route path="/" element={<Course />} />
      </Routes>
    </MantineProvider>
  );
}
