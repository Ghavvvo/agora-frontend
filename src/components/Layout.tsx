import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Warehouse, 
  DollarSign,
  Folder
} from "lucide-react";
import agoraLogo from "@/assets/agora-logo.png";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Inicio" },
    { to: "/productos", icon: Package, label: "Productos" },
    { to: "/categorias", icon: Folder, label: "Categorías" },
    { to: "/ventas", icon: ShoppingCart, label: "Ventas" },
    { to: "/inventario", icon: Warehouse, label: "Inventario" },
    { to: "/cierre-caja", icon: DollarSign, label: "Cierre de Caja" },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card">
        <div className="flex h-16 items-center border-b border-border px-6">
          <img src={agoraLogo} alt="Ágora" className="h-8" />
        </div>
        
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
