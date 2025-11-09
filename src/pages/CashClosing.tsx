import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DollarSign, CreditCard, Banknote, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const CashClosing = () => {
  const [actualCashUSD, setActualCashUSD] = useState("");
  const [actualCashMN, setActualCashMN] = useState("");

  // Mock data - in real app, this would come from actual sales
  const dailySummary = {
    totalSalesUSD: 1250.50,
    totalSalesMN: 125000,
    cashSalesUSD: 800.00,
    cashSalesMN: 80000,
    transferSalesUSD: 450.50,
    transferSalesMN: 45000,
    theoreticalCashUSD: 800.00,
    theoreticalCashMN: 80000,
  };

  const calculateDifference = (actual: string, theoretical: number) => {
    const actualAmount = parseFloat(actual) || 0;
    return actualAmount - theoretical;
  };

  const differenceUSD = calculateDifference(actualCashUSD, dailySummary.theoreticalCashUSD);
  const differenceMN = calculateDifference(actualCashMN, dailySummary.theoreticalCashMN);

  const handleCloseCash = () => {
    if (!actualCashUSD || !actualCashMN) {
      toast.error("Por favor ingrese el efectivo en ambas monedas");
      return;
    }

    toast.success("Cierre de caja realizado con éxito", {
      description: "El registro ha sido guardado",
    });
    
    setActualCashUSD("");
    setActualCashMN("");
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cierre de Caja</h1>
          <p className="text-muted-foreground">Resumen diario de ventas y efectivo</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Daily Summary - USD */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-success" />
                Resumen Diario - USD
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary">
                  <span className="font-medium">Ventas Totales</span>
                  <span className="text-xl font-bold">
                    ${dailySummary.totalSalesUSD.toFixed(2)}
                  </span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Efectivo</span>
                    </div>
                    <span className="font-medium">
                      ${dailySummary.cashSalesUSD.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Transferencia</span>
                    </div>
                    <span className="font-medium">
                      ${dailySummary.transferSalesUSD.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Efectivo Teórico</span>
                    <span className="font-medium">
                      ${dailySummary.theoreticalCashUSD.toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="actualCashUSD">Efectivo Real en Caja</Label>
                    <Input
                      id="actualCashUSD"
                      type="number"
                      step="0.01"
                      value={actualCashUSD}
                      onChange={(e) => setActualCashUSD(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>

                  {actualCashUSD && (
                    <div
                      className={`p-3 rounded-lg ${
                        differenceUSD === 0
                          ? "bg-success/10 border border-success/20"
                          : differenceUSD > 0
                          ? "bg-warning/10 border border-warning/20"
                          : "bg-destructive/10 border border-destructive/20"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Diferencia</span>
                        <span className={`text-lg font-bold ${
                          differenceUSD === 0
                            ? "text-success"
                            : differenceUSD > 0
                            ? "text-warning"
                            : "text-destructive"
                        }`}>
                          {differenceUSD > 0 ? "+" : ""}${differenceUSD.toFixed(2)}
                        </span>
                      </div>
                      {differenceUSD === 0 && (
                        <div className="flex items-center gap-2 mt-2 text-success">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Cuadre perfecto</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Summary - MN */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Resumen Diario - MN (Pesos)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary">
                  <span className="font-medium">Ventas Totales</span>
                  <span className="text-xl font-bold">
                    {dailySummary.totalSalesMN.toLocaleString()} MN
                  </span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Efectivo</span>
                    </div>
                    <span className="font-medium">
                      {dailySummary.cashSalesMN.toLocaleString()} MN
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Transferencia</span>
                    </div>
                    <span className="font-medium">
                      {dailySummary.transferSalesMN.toLocaleString()} MN
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Efectivo Teórico</span>
                    <span className="font-medium">
                      {dailySummary.theoreticalCashMN.toLocaleString()} MN
                    </span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="actualCashMN">Efectivo Real en Caja</Label>
                    <Input
                      id="actualCashMN"
                      type="number"
                      step="1"
                      value={actualCashMN}
                      onChange={(e) => setActualCashMN(e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  {actualCashMN && (
                    <div
                      className={`p-3 rounded-lg ${
                        differenceMN === 0
                          ? "bg-success/10 border border-success/20"
                          : differenceMN > 0
                          ? "bg-warning/10 border border-warning/20"
                          : "bg-destructive/10 border border-destructive/20"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Diferencia</span>
                        <span className={`text-lg font-bold ${
                          differenceMN === 0
                            ? "text-success"
                            : differenceMN > 0
                            ? "text-warning"
                            : "text-destructive"
                        }`}>
                          {differenceMN > 0 ? "+" : ""}{differenceMN.toLocaleString()} MN
                        </span>
                      </div>
                      {differenceMN === 0 && (
                        <div className="flex items-center gap-2 mt-2 text-success">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Cuadre perfecto</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Close Cash Button */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center">
              <Button
                size="lg"
                className="w-full max-w-md"
                onClick={handleCloseCash}
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Cerrar Caja
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              El cierre guardará el registro y reiniciará los contadores para el próximo día
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CashClosing;
