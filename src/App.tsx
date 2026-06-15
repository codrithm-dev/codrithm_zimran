import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/CustomCursor";

import Splash from "@/pages/Splash";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Products from "@/pages/Products";
import Blog from "@/pages/Blog";
import Projects from "@/pages/Projects";
import Team from "@/pages/Team";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import Categories from "@/pages/Categories";
import CategoryDetail from "@/pages/CategoryDetail";
import Join from "@/pages/Join";
import Profile from "@/pages/Profile";
import Confirmation from "@/pages/Confirmation";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminContent from "@/pages/admin/AdminContent";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminRequests from "@/pages/admin/AdminRequests";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminInquiries from "@/pages/admin/AdminInquiries";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Splash} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/products" component={Products} />
        <Route path="/blog" component={Blog} />
        <Route path="/projects" component={Projects} />
        <Route path="/team" component={Team} />
        <Route path="/careers" component={Careers} />
        <Route path="/contact" component={Contact} />
        <Route path="/categories" component={Categories} />
        <Route path="/categories/:id" component={CategoryDetail} />
        <Route path="/join" component={Join} />
        <Route path="/profile" component={Profile} />
        <Route path="/confirmation" component={Confirmation} />

        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/content" component={AdminContent} />
        <Route path="/admin/blog" component={AdminBlog} />
        <Route path="/admin/projects" component={AdminProjects} />
        <Route path="/admin/inquiries" component={AdminInquiries} />
        <Route path="/admin/users" component={AdminUsers} />
        <Route path="/admin/requests" component={AdminRequests} />
        <Route path="/admin/analytics" component={AdminAnalytics} />
        <Route path="/admin/settings" component={AdminSettings} />

        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="codrithm-theme">
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
          <CustomCursor />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
