import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { PrintAll } from "./PrintAll";

const root = createRoot(document.getElementById("root")!);

if (new URLSearchParams(window.location.search).has("print")) {
  root.render(<PrintAll />);
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
