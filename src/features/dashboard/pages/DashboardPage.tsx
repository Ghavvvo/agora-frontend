import { Layout } from "@/shared/components/layout";
import { StatCard } from "@/shared/components/data-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { 
  DollarSign, 
  Package, 
  AlertTriangle,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { useProducts } from "@/features/products";
import { useCategories } from "@/features/categories";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // React Query hooks
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();

  // Calculate stats
  const activeProducts = products.filter(p => p.active);
  const totalProducts = products.length;
  const totalCategories = categories.filter(c => c.active).length;

  // Mock weekly sales data
  const weekSales = [
    { day: "Lun", usd: 125, mn: 12500 },
    { day: "Mar", usd: 180, mn: 18000 },
    { day: "Mié", usd: 150, mn: 15000 },
    { day: "Jue", usd: 220, mn: 22000 },
    { day: "Vie", usd: 300, mn: 30000 },
    { day: "Sáb", usd: 450, mn: 45000 },
    { day: "Dom", usd: 280, mn: 28000 },
  ];

  const maxSale = Math.max(...weekSales.map(s => s.usd));

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Control</h1>
          <p className="text-muted-foreground">Resumen de operaciones del día</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Ventas Hoy (USD)"
            value="$0.00"
            subtitle="Próximamente"
            icon={DollarSign}
            trend="neutral"
          />
          <StatCard
            title="Ventas Hoy (CUP)"
            value="0 CUP"
            subtitle="Próximamente"
            icon={DollarSign}
            trend="neutral"
          />
          <StatCard
            title="Productos Activos"
            value={activeProducts.length.toString()}
            subtitle={`Total: ${totalProducts} productos`}
            icon={Package}
            trend="neutral"
          />
          <StatCard
            title="Categorías"
            value={totalCategories.toString()}
            subtitle="Categorías activas"
            icon={AlertTriangle}
            trend="neutral"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Weekly Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Ventas de la Última Semana (USD)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weekSales.map((day) => (
                  <div key={day.day} className="flex items-center gap-3">
                    <span className="w-12 text-sm text-muted-foreground">{day.day}</span>
                    <div className="flex-1 h-8 bg-secondary rounded-md overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${(day.usd / maxSale) * 100}%` }}
                      />
                    </div>
                    <span className="w-20 text-sm font-medium text-right">
                      ${day.usd}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Productos con Stock Bajo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <p>Funcionalidad próximamente disponible</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access */}
        <Card>
          <CardHeader>
            <CardTitle>Acceso Rápido a Módulos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
                onClick={() => navigate("/productos")}
              >
                <Package className="h-6 w-6" />
                <span>Gestionar Productos</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
                onClick={() => navigate("/ventas")}
              >
                <DollarSign className="h-6 w-6" />
                <span>Nueva Venta</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
                onClick={() => navigate("/inventario")}
              >
                <Package className="h-6 w-6" />
                <span>Ver Inventario</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4"
                onClick={() => navigate("/cierre-caja")}
              >
                <DollarSign className="h-6 w-6" />
                <span>Cierre de Caja</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
