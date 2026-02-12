import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryProvider } from "@/app/providers/ReactQueryProvider";
import { AppRoutes } from "@/app/router";

const App = () => (
  <ReactQueryProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </ReactQueryProvider>
);

export default App;
