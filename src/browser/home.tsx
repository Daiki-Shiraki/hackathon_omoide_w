import { createRoot } from "react-dom/client";

import App from "./home/";

import "modern-normalize";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
