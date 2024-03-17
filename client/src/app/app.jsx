/*-------------------------------------------------------------------
|                    🚀 CHAT APP 🚀
|
|  HELLO 👋! WELCOME TO CHAT APP. THIS APP FETCHES DATA FROM AN 
|  EXTERNAL API AND DISPLAYS THE DATA. THIS CHATTING APP ALLOWS 
|  YOU TO COMMUNICATE WITH YOUR CONTACTS IN WEB CHAT ROOMS. IT 
|  ENABLES YOU TO SEND AND RECEIVE MESSAGES. CHATTING APPS MAKE 
|  IT EASIER, SIMPLER, AND FASTER TO CONNECT WITH EVERYONE AND 
|  IT IS ALSO EASY TO USE, FEEL FREE TO REACH OUT TO ME OR OPEN 
|  AN ISSUE ON GITHUB. THANKS!
|
|  🔗CREATOR: https://github.com/zehan12
|  🔗SOURCE CODE: https://github.com/zehan12/chat-app
|
*-------------------------------------------------------------------*/
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
