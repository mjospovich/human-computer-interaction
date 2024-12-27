interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number' | 'select';
  options?: string[];
  error?: string;
}

export function FormInput({ 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  type = 'text',
  options = [],
  error = ''
}: FormInputProps) {
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
      <div className="relative">
        {type === 'select' ? (
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="appearance-none w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
            >
              <option value="">Odaberi {label.toLowerCase()}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {value && (
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
            )}
          </div>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent pr-10"
          />
        )}
        {value && (
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
          </svg>
        )}
      </div>
    </div>
  );
}
