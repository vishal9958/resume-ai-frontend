const TemplateSelector = ({ template, setTemplate }: any) => {

  return (
    <div className="p-4 border-b bg-white flex gap-3">

      {["modern","classic","minimal"].map(t => (
        <button
          key={t}
          onClick={() => setTemplate(t)}
          className={`px-4 py-2 rounded-lg text-sm ${
            template === t
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {t}
        </button>
      ))}

    </div>
  );
};

export default TemplateSelector;
