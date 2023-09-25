import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./contexts/AuthContext";
import { LibraryContextProvider } from "./contexts/LibraryContext";
import ErrorBoundary from "./Error";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new QueryClient();

root.render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <LibraryContextProvider>
        <AuthContextProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AuthContextProvider>
      </LibraryContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

reportWebVitals();
