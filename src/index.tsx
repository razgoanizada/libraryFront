import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./contexts/AuthContext";
import { LibraryContextProvider } from "./contexts/LibraryContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new QueryClient();

root.render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <LibraryContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </LibraryContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

reportWebVitals();
