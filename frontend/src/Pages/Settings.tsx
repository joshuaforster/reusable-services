import { useState, useEffect } from "react";

type Settings = {
  companyName: string;
  address: string;
  email: string;
  phone: string;
};

const DEFAULT_SETTINGS: Settings = {
  companyName: "",
  address: "",
  email: "",
  phone: "",
};

export default function Settings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const saved = localStorage.getItem("settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  function handleChange(field: keyof Settings, value: string) {
    setSettings({ ...settings, [field]: value });
  }

  function saveSettings() {
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  return (
    <div className="max-w-3xl text-white p-6">
      <h1 className="text-2xl mb-6">Settings</h1>

      <div className="space-y-4">
        <input
          placeholder="Company name"
          value={settings.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 p-2"
        />

        <input
          placeholder="Address"
          value={settings.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 p-2"
        />

        <input
          placeholder="Email"
          value={settings.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 p-2"
        />

        <input
          placeholder="Phone"
          value={settings.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 p-2"
        />

        <button
          onClick={saveSettings}
          className="px-4 py-2 border border-gray-700 hover:bg-white/10"
        >
          Save
        </button>
      </div>
    </div>
  );
}
