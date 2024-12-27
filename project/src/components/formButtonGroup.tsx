interface FormButtonGroupProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function FormButtonGroup({ 
  label, 
  options, 
  value, 
  onChange,
  error = ''
}: FormButtonGroupProps) {
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-main-text-black">
          {label}
        </label>
        {error && (
          <span className="text-sm text-red-500">
            {error}
          </span>
        )}
      </div>
      <div className="flex gap-2 w-full">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`flex-1 px-4 py-2 rounded-lg border transition-colors duration-200 ${
              value === option
                ? 'bg-brand-light text-main-text-black border-brand-light'
                : 'bg-white text-secondary-text-black border-gray-300 hover:border-brand'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
