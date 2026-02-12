import { useState } from "react";
import { Layout } from "@/shared/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Search, Plus, Trash2, ShoppingCart, Loader2, AlertTriangle } from "lucide-react";
import { useProducts, type Product } from "@/features/products";
interface CartItem {
  product: Product;
  quantity: number;
}
const Sales = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"CUP" | "USD">("CUP");
  // React Query hooks
  const { data: products = [], isLoading } = useProducts();
  const filteredProducts = products.filter((product) =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
    product.active
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
  };
  const updateQuantity = (productId: number, quantity: number) => {
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
  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price =
        paymentMethod === "USD"
          ? item.product.salePriceUsd
          : item.product.salePriceCup;
      return total + price * item.quantity;
    }, 0);
  };
  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }
    // Aquí iría la lógica de checkout cuando se implemente la API de ventas
    alert(`Total a pagar: ${paymentMethod === "USD" ? "$" : ""}${calculateTotal().toFixed(2)} ${paymentMethod}`);
    setCart([]);
  };
  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Punto de Venta</h1>
          <p className="text-muted-foreground">Sistema de ventas rápido</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Products */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
            {/* Products List */}
            <Card>
              <CardHeader>
                <CardTitle>Productos Disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p>No se encontraron productos</p>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.code}</p>
                          <p className="text-sm font-bold mt-1">
                            {paymentMethod === "USD" 
                              ? `$${product.salePriceUsd.toFixed(2)} USD`
                              : `$${product.salePriceCup.toFixed(2)} CUP`}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Agregar
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Cart */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Carrito ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Payment Method */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Método de Pago</label>
                  <Select value={paymentMethod} onValueChange={(v: "CUP" | "USD") => setPaymentMethod(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CUP">Pesos Cubanos (CUP)</SelectItem>
                      <SelectItem value="USD">Dólares (USD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Cart Items */}
                {cart.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                    <p className="text-sm">Carrito vacío</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.product.id} className="p-2 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.product.name}</p>
                            <p className="text-xs text-muted-foreground">{item.product.code}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <p className="text-sm font-bold">
                            ${(
                              (paymentMethod === "USD" 
                                ? item.product.salePriceUsd 
                                : item.product.salePriceCup) * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Total */}
                {cart.length > 0 && (
                  <>
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span>
                          {paymentMethod === "USD" ? "$" : ""}
                          {calculateTotal().toFixed(2)} {paymentMethod}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Procesar Venta
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Sales;
