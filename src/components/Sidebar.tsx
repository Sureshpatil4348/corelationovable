
import React from "react";
import {
  LayoutDashboard,
  Braces,
  BarChart3,
  LineChart,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useMT5 } from "@/context/MT5Context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Define the structure for navigation items
interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<any>;
}

// Update the navigation items array to include the new Indicators page
export const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Strategies",
    href: "/strategy",
    icon: Braces,
  },
  {
    title: "Indicators",
    href: "/indicators",
    icon: BarChart3,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: LineChart,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const Sidebar: React.FC = () => {
  const { accountInfo, disconnect, connectionStatus } = useMT5();
  const { toast } = useToast();

  const handleDisconnect = async () => {
    const result = await disconnect();
    if (result) {
      toast({
        title: "Disconnected",
        description: "Successfully disconnected from MT5.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to disconnect from MT5.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col w-64 border-r border-r-muted bg-secondary">
      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-8 w-full items-center justify-between rounded-md">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium leading-none">
                  {accountInfo?.name || "Guest"}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end" forceMount>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {connectionStatus === "connected" && (
              <DropdownMenuItem onClick={handleDisconnect}>
                Disconnect MT5
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav className="flex-1 px-2 py-4">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  }`
                }
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
