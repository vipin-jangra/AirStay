// src/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import { Layout } from "./components/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/listing/:id" element={<ListingDetailPage />} />
      </Route>
    </Routes>
  );
}

