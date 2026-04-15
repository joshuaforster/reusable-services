import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./Layout/AppShell";
import Dashboard from "./Pages/Dashboard";
import Analytics from "./Pages/Analytics";
import Applications from "./Pages/Applications";
import ApplicationDetail from "./Pages/ApplicationDetail";
import LetterPreview from "./Pages/LetterPreview";
import Campaigns from "./Pages/Campaigns";
import Templates from "./Pages/Templates";
import Queue from "./Pages/Queue";
import History from "./Pages/History";
import Settings from "./Pages/Settings";
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root as HTMLElement).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="applications" element={<Applications />} />
          <Route path="application/:id" element={<ApplicationDetail />} />
          <Route path="preview/:id" element={<LetterPreview />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="templates" element={<Templates />} />
          <Route path="queue" element={<Queue />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>,
);
