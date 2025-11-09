export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  codigoInterno: string;
  precioCompra: number;
  precioVentaUSD: number;
  precioVentaMN: number;
  stockActual: number;
  stockMinimo: number;
}

export interface Sale {
  id: string;
  fecha: string;
  productos: { producto: Product; cantidad: number }[];
  totalUSD: number;
  totalMN: number;
  metodoPago: "USD" | "MN" | "Efectivo" | "Transferencia";
}

export interface InventoryMovement {
  id: string;
  fecha: string;
  producto: string;
  tipo: "venta" | "ajuste" | "compra";
  cantidad: number;
  usuario: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    nombre: "Arroz Blanco 1kg",
    categoria: "Alimentos",
    codigoInterno: "ALI001",
    precioCompra: 0.80,
    precioVentaUSD: 1.50,
    precioVentaMN: 150,
    stockActual: 45,
    stockMinimo: 20,
  },
  {
    id: "2",
    nombre: "Aceite Vegetal 1L",
    categoria: "Alimentos",
    codigoInterno: "ALI002",
    precioCompra: 2.50,
    precioVentaUSD: 4.00,
    precioVentaMN: 400,
    stockActual: 12,
    stockMinimo: 15,
  },
  {
    id: "3",
    nombre: "Detergente en Polvo 500g",
    categoria: "Limpieza",
    codigoInterno: "LIM001",
    precioCompra: 1.20,
    precioVentaUSD: 2.50,
    precioVentaMN: 250,
    stockActual: 8,
    stockMinimo: 10,
  },
  {
    id: "4",
    nombre: "Frijoles Negros 1kg",
    categoria: "Alimentos",
    codigoInterno: "ALI003",
    precioCompra: 1.00,
    precioVentaUSD: 2.00,
    precioVentaMN: 200,
    stockActual: 35,
    stockMinimo: 20,
  },
  {
    id: "5",
    nombre: "Jabón de Lavar",
    categoria: "Limpieza",
    codigoInterno: "LIM002",
    precioCompra: 0.50,
    precioVentaUSD: 1.00,
    precioVentaMN: 100,
    stockActual: 60,
    stockMinimo: 30,
  },
  {
    id: "6",
    nombre: "Azúcar Refino 1kg",
    categoria: "Alimentos",
    codigoInterno: "ALI004",
    precioCompra: 0.90,
    precioVentaUSD: 1.75,
    precioVentaMN: 175,
    stockActual: 5,
    stockMinimo: 15,
  },
];

export const mockSales: Sale[] = [
  {
    id: "1",
    fecha: new Date().toISOString(),
    productos: [
      { producto: mockProducts[0], cantidad: 2 },
      { producto: mockProducts[3], cantidad: 1 },
    ],
    totalUSD: 5.00,
    totalMN: 0,
    metodoPago: "USD",
  },
];

export const mockInventoryMovements: InventoryMovement[] = [
  {
    id: "1",
    fecha: new Date().toISOString(),
    producto: "Arroz Blanco 1kg",
    tipo: "venta",
    cantidad: -2,
    usuario: "Admin",
  },
  {
    id: "2",
    fecha: new Date().toISOString(),
    producto: "Aceite Vegetal 1L",
    tipo: "compra",
    cantidad: 10,
    usuario: "Admin",
  },
  {
    id: "3",
    fecha: new Date(Date.now() - 86400000).toISOString(),
    producto: "Detergente en Polvo 500g",
    tipo: "ajuste",
    cantidad: -2,
    usuario: "Admin",
  },
];
