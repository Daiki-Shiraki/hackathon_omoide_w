import { createRoot } from "react-dom/client";

import App from "./book/";

import "modern-normalize";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
