import Layout from "@/components/Layout";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Package, 
  AlertTriangle,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { mockProducts, mockSales } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Calculate stats
  const todaySalesUSD = mockSales.reduce((acc, sale) => acc + sale.totalUSD, 0);
  const todayServicesMN = mockSales.reduce((acc, sale) => acc + sale.totalMN, 0);
  const lowStockProducts = mockProducts.filter(p => p.stockActual <= p.stockMinimo);
  
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
            value={`$${todaySalesUSD.toFixed(2)}`}
            subtitle="+12.5% vs ayer"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Ventas Hoy (MN)"
            value={`${todayServicesMN.toLocaleString()} MN`}
            subtitle="+8.2% vs ayer"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Productos Registrados"
            value={mockProducts.length.toString()}
            subtitle="En 3 categorías"
            icon={Package}
            trend="neutral"
          />
          <StatCard
            title="Stock Bajo"
            value={lowStockProducts.length.toString()}
            subtitle="Requieren atención"
            icon={AlertTriangle}
            trend="down"
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
              <div className="space-y-3">
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{product.nombre}</p>
                        <p className="text-sm text-muted-foreground">
                          Stock actual: {product.stockActual} | Mínimo: {product.stockMinimo}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">
                          Bajo
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-6">
                    No hay productos con stock bajo
                  </p>
                )}
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
