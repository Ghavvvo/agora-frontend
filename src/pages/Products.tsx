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
import { Plus, Edit, Trash2, Search, AlertTriangle } from "lucide-react";
import { mockProducts, Product } from "@/lib/mockData";
import { toast } from "sonner";

const Products = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const categories = Array.from(new Set(products.map((p) => p.categoria)));

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.categoria === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Producto eliminado correctamente");
  };

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      nombre: formData.get("nombre") as string,
      categoria: formData.get("categoria") as string,
      codigoInterno: formData.get("codigoInterno") as string,
      precioCompra: parseFloat(formData.get("precioCompra") as string),
      precioVentaUSD: parseFloat(formData.get("precioVentaUSD") as string),
      precioVentaMN: parseFloat(formData.get("precioVentaMN") as string),
      stockActual: parseInt(formData.get("stockActual") as string),
      stockMinimo: parseInt(formData.get("stockMinimo") as string),
    };

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? productData : p)));
      toast.success("Producto actualizado correctamente");
    } else {
      setProducts([...products, productData]);
      toast.success("Producto agregado correctamente");
    }
    
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Productos</h1>
            <p className="text-muted-foreground">Gestión de inventario de productos</p>
          </div>
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Producto
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Productos ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead className="text-right">Precio USD</TableHead>
                  <TableHead className="text-right">Precio MN</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.nombre}</TableCell>
                    <TableCell>{product.categoria}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.codigoInterno}
                    </TableCell>
                    <TableCell className="text-right">
                      ${product.precioVentaUSD.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.precioVentaMN.toLocaleString()} MN
                    </TableCell>
                    <TableCell className="text-right">{product.stockActual}</TableCell>
                    <TableCell>
                      {product.stockActual <= product.stockMinimo ? (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Bajo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          Normal
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Producto" : "Agregar Producto"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveProduct}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre del Producto</Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      defaultValue={editingProduct?.nombre}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoría</Label>
                    <Input
                      id="categoria"
                      name="categoria"
                      defaultValue={editingProduct?.categoria}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codigoInterno">Código Interno</Label>
                  <Input
                    id="codigoInterno"
                    name="codigoInterno"
                    defaultValue={editingProduct?.codigoInterno}
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="precioCompra">Precio Compra (USD)</Label>
                    <Input
                      id="precioCompra"
                      name="precioCompra"
                      type="number"
                      step="0.01"
                      defaultValue={editingProduct?.precioCompra}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="precioVentaUSD">Precio Venta (USD)</Label>
                    <Input
                      id="precioVentaUSD"
                      name="precioVentaUSD"
                      type="number"
                      step="0.01"
                      defaultValue={editingProduct?.precioVentaUSD}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="precioVentaMN">Precio Venta (MN)</Label>
                    <Input
                      id="precioVentaMN"
                      name="precioVentaMN"
                      type="number"
                      step="1"
                      defaultValue={editingProduct?.precioVentaMN}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stockActual">Stock Actual</Label>
                    <Input
                      id="stockActual"
                      name="stockActual"
                      type="number"
                      defaultValue={editingProduct?.stockActual}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stockMinimo">Stock Mínimo</Label>
                    <Input
                      id="stockMinimo"
                      name="stockMinimo"
                      type="number"
                      defaultValue={editingProduct?.stockMinimo}
                      required
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Products;
