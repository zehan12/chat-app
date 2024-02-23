import { cn } from "../lib/utils";
import { TailwindIndicator } from "../components/TailwindIndicator";
import AllRoutes from "../routes/AllRoutes";
import ChatProvider from "../context/chat.provider";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "../context/theme.provider";
import ThemeToggle from "../components/ThemeToggle";
import { ScrollArea } from "../components/ui/scroll-area";

export function App() {
  return (
    <>
      <Router>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ChatProvider>
              <ScrollArea>
                <AllRoutes />
              </ScrollArea>
              <TailwindIndicator />
          </ChatProvider>
        </ThemeProvider>
      </Router>
    </>
  );
}
