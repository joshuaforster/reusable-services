import { useState } from "react";

type Template = {
  id: number;
  name: string;
  body: string;
};

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  function addTemplate() {
    const newTemplate: Template = {
      id: Date.now(),
      name: name,
      body: body,
    };

    setTemplates([...templates, newTemplate]);
    setName("");
    setBody("");
  }

  return (
    <div className="max-w-4xl p-6 text-white">
      <h1 className="text-2xl mb-6">Templates</h1>

      {/* Form */}
      <div className="mb-6 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Template name"
          className="w-full bg-gray-800 border border-gray-700 p-2"
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Template body"
          className="w-full bg-gray-800 border border-gray-700 p-2 h-32"
        />

        <button
          onClick={addTemplate}
          className="px-4 py-2 border border-gray-700 hover:bg-white/10"
        >
          Add Template
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border border-gray-800 p-4 bg-gray-900"
          >
            <p className="font-semibold">{template.name}</p>
            <p className="text-sm text-gray-400">{template.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
