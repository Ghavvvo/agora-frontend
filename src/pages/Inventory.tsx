import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Package, Edit, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { mockProducts, mockInventoryMovements, Product } from "@/lib/mockData";
import { toast } from "sonner";

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [movements] = useState(mockInventoryMovements);
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustmentType, setAdjustmentType] = useState<"add" | "subtract">("add");
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("");

  const handleAdjustStock = (product: Product) => {
    setSelectedProduct(product);
    setIsAdjustOpen(true);
  };

  const handleConfirmAdjustment = () => {
    if (!selectedProduct || !adjustmentQuantity) return;

    const quantity = parseInt(adjustmentQuantity);
    const newStock =
      adjustmentType === "add"
        ? selectedProduct.stockActual + quantity
        : selectedProduct.stockActual - quantity;

    if (newStock < 0) {
      toast.error("El stock no puede ser negativo");
      return;
    }

    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id ? { ...p, stockActual: newStock } : p
      )
    );

    toast.success("Ajuste de inventario realizado");
    setIsAdjustOpen(false);
    setAdjustmentQuantity("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "compra":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "venta":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Edit className="h-4 w-4 text-warning" />;
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventario</h1>
          <p className="text-muted-foreground">Gestión y control de stock</p>
        </div>

        {/* Inventory Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Vista General de Inventario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-right">Stock Actual</TableHead>
                  <TableHead className="text-right">Stock Mínimo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.nombre}</TableCell>
                    <TableCell>{product.categoria}</TableCell>
                    <TableCell className="text-right font-bold">
                      {product.stockActual}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {product.stockMinimo}
                    </TableCell>
                    <TableCell>
                      {product.stockActual <= product.stockMinimo ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Stock Bajo
                        </Badge>
                      ) : product.stockActual <= product.stockMinimo * 1.5 ? (
                        <Badge variant="outline" className="gap-1 bg-warning/10 text-warning border-warning/20">
                          <AlertTriangle className="h-3 w-3" />
                          Alerta
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Normal
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAdjustStock(product)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Ajustar Stock
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Movement History */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Movimientos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead>Usuario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>{formatDate(movement.fecha)}</TableCell>
                    <TableCell className="font-medium">{movement.producto}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMovementIcon(movement.tipo)}
                        <span className="capitalize">{movement.tipo}</span>
                      </div>
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        movement.cantidad > 0 ? "text-success" : "text-destructive"
                      }`}
                    >
                      {movement.cantidad > 0 ? "+" : ""}
                      {movement.cantidad}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {movement.usuario}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Stock Adjustment Dialog */}
        <Dialog open={isAdjustOpen} onOpenChange={setIsAdjustOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajustar Stock - {selectedProduct?.nombre}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Stock Actual</Label>
                <Input
                  value={selectedProduct?.stockActual || 0}
                  disabled
                  className="font-bold"
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo de Ajuste</Label>
                <Select
                  value={adjustmentType}
                  onValueChange={(v: "add" | "subtract") => setAdjustmentType(v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">Aumentar Stock (Compra/Entrada)</SelectItem>
                    <SelectItem value="subtract">Reducir Stock (Ajuste/Merma)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Cantidad a {adjustmentType === "add" ? "Agregar" : "Restar"}</Label>
                <Input
                  type="number"
                  min="1"
                  value={adjustmentQuantity}
                  onChange={(e) => setAdjustmentQuantity(e.target.value)}
                  placeholder="0"
                />
              </div>

              {adjustmentQuantity && selectedProduct && (
                <div className="p-4 rounded-lg bg-secondary">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Nuevo Stock:</span>
                    <span className="text-lg font-bold">
                      {adjustmentType === "add"
                        ? selectedProduct.stockActual + parseInt(adjustmentQuantity)
                        : selectedProduct.stockActual - parseInt(adjustmentQuantity)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdjustOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmAdjustment}>Confirmar Ajuste</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Inventory;
