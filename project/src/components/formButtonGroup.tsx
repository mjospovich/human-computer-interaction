interface FormButtonGroupProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function FormButtonGroup({ 
  label, 
  options, 
  value, 
  onChange, 
  required = false 
}: FormButtonGroupProps) {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-main-text-black mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
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
