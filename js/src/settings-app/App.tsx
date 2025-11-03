import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      Hello world, React App!
    </QueryClientProvider>
  );
}

const init = () => {
  const domNode = document.getElementById("starter-settings-container");
  if (domNode) {
    const root = createRoot(domNode);
    root.render(<App />);
  }
};

export default init;
