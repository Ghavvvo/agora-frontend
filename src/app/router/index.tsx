import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "@/features/dashboard/pages";
import { ProductsPage } from "@/features/products/pages";
import { CategoriesPage } from "@/features/categories/pages";
import { SalesPage } from "@/features/sales/pages";
import { InventoryPage } from "@/features/inventory/pages";
import { CashClosingPage } from "@/features/cash-closing/pages";
import { NotFound } from "@/shared/components/errors";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/productos" element={<ProductsPage />} />
    <Route path="/categorias" element={<CategoriesPage />} />
    <Route path="/ventas" element={<SalesPage />} />
    <Route path="/inventario" element={<InventoryPage />} />
    <Route path="/cierre-caja" element={<CashClosingPage />} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

