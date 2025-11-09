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
import { Search, Plus, Trash2, ShoppingCart } from "lucide-react";
import { mockProducts, Product } from "@/lib/mockData";
import { toast } from "sonner";

interface CartItem {
  product: Product;
  quantity: number;
}

const Sales = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"USD" | "MN">("USD");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState("");

  const filteredProducts = mockProducts.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    toast.success(`${product.nombre} agregado al carrito`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price =
        paymentMethod === "USD"
          ? item.product.precioVentaUSD
          : item.product.precioVentaMN;
      return total + price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }
    setIsCheckoutOpen(true);
  };

  const handleConfirmSale = () => {
    const total = calculateTotal();
    const received = parseFloat(receivedAmount);
    
    if (received < total) {
      toast.error("El monto recibido es insuficiente");
      return;
    }

    toast.success("Venta realizada con éxito");
    setCart([]);
    setIsCheckoutOpen(false);
    setReceivedAmount("");
  };

  const total = calculateTotal();
  const change = parseFloat(receivedAmount) - total || 0;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Punto de Venta</h1>
          <p className="text-muted-foreground">Sistema de ventas rápido</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Product Search */}
          <Card>
            <CardHeader>
              <CardTitle>Buscar Productos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="max-h-[500px] overflow-y-auto space-y-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                    onClick={() => addToCart(product)}
                  >
                    <div>
                      <p className="font-medium">{product.nombre}</p>
                      <div className="flex gap-3 text-sm text-muted-foreground">
                        <span>${product.precioVentaUSD} USD</span>
                        <span>•</span>
                        <span>{product.precioVentaMN} MN</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Carrito de Compra
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Payment Method Selector */}
              <div className="space-y-2">
                <Label>Método de Pago</Label>
                <Select value={paymentMethod} onValueChange={(v: "USD" | "MN") => setPaymentMethod(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">Dólares (USD)</SelectItem>
                    <SelectItem value="MN">Pesos (MN)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cart Items */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No hay productos en el carrito
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead className="w-24">Cant.</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.map((item) => {
                        const price =
                          paymentMethod === "USD"
                            ? item.product.precioVentaUSD
                            : item.product.precioVentaMN;
                        const subtotal = price * item.quantity;

                        return (
                          <TableRow key={item.product.id}>
                            <TableCell className="font-medium">
                              {item.product.nombre}
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(
                                    item.product.id,
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                className="w-16"
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              {paymentMethod === "USD"
                                ? `$${price.toFixed(2)}`
                                : `${price.toLocaleString()} MN`}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {paymentMethod === "USD"
                                ? `$${subtotal.toFixed(2)}`
                                : `${subtotal.toLocaleString()} MN`}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>
                    {paymentMethod === "USD"
                      ? `$${total.toFixed(2)} USD`
                      : `${total.toLocaleString()} MN`}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setCart([])}
                  disabled={cart.length === 0}
                >
                  Cancelar
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                >
                  Cobrar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkout Dialog */}
        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Venta</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="flex justify-between text-lg">
                  <span>Total a Pagar:</span>
                  <span className="font-bold">
                    {paymentMethod === "USD"
                      ? `$${total.toFixed(2)} USD`
                      : `${total.toLocaleString()} MN`}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="received">Efectivo Recibido</Label>
                <Input
                  id="received"
                  type="number"
                  step="0.01"
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              {receivedAmount && (
                <div className="space-y-2">
                  <div className="flex justify-between text-lg">
                    <span>Cambio a Devolver:</span>
                    <span className={`font-bold ${change < 0 ? 'text-destructive' : 'text-success'}`}>
                      {paymentMethod === "USD"
                        ? `$${change.toFixed(2)} USD`
                        : `${change.toLocaleString()} MN`}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmSale} disabled={change < 0}>
                Confirmar Venta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Sales;
