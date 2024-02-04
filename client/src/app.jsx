import { cn } from "./lib/utils";
import { TailwindIndicator } from "./components/TailwindIndicator";
import AllRoutes from "./routes/AllRoutes";

export function App() {
  return (
    <>
      <body className={cn("min-h-screen bg-zinc-950 font-sans antialiased")}>
        <AllRoutes />
        <TailwindIndicator />
      </body>
    </>
  );
}
