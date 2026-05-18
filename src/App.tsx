import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import FeedPage from "@/pages/feed";
import DirectoryPage from "@/pages/directory";
import LeaderboardPage from "@/pages/leaderboard";
import PlannerPage from "@/pages/planner";
import AdminPage from "@/pages/admin";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/feed" component={FeedPage} />
        <Route path="/directory" component={DirectoryPage} />
        <Route path="/leaderboard" component={LeaderboardPage} />
        <Route path="/planner" component={PlannerPage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base="">
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
