
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import LetterPreview from "./Pages/letterPreview/letterPreview";
import Applications from "./Pages/LeadsPages/Applications"
import Layout from "./Layout/layout";
import Analytics from "./Pages/Analytics";
import Templates from "./Pages/Templates";
import Queue from "./Pages/Queue";
import History from "./Pages/History";
import Campaigns from "./Pages/Campaigns";
import Settings from "./Pages/Settings";
import ApplicationDetail from "./Pages/LeadsPages/ApplicationDetails";
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root as HTMLElement).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="preview/:id" element={<LetterPreview />} />
          <Route path="applications" element={<Applications />} />
          <Route path="application/:id" element={<ApplicationDetail />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="templates" element={<Templates />} />
          <Route path="queue" element={<Queue />} />
          <Route path="history" element={<History />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>,
);
