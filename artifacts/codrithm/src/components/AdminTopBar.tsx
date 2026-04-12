import { Bell, Search, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AdminTopBarProps {
  title: string;
}

export function AdminTopBar({ title }: AdminTopBarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-30">
      <h1 className="font-semibold text-base" data-testid="text-admin-page-title">{title}</h1>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 h-8 px-3 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground w-52">
          <Search className="w-3.5 h-3.5" />
          <span>Search...</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          data-testid="button-admin-theme-toggle"
        >
          {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors relative"
          data-testid="button-admin-notifications"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-destructive" />
        </motion.button>

        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">AU</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
