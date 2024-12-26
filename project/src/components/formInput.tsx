interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number' | 'select';
  options?: string[];
}

export function FormInput({ 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  type = 'text',
  options = []
}: FormInputProps) {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-main-text-black mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent ${
            value ? 'border-brand-light' : 'border-gray-300'
          }`}
        >
          <option value="">Odaberi {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent ${
            value ? 'border-brand' : 'border-gray-300'
          }`}
        />
      )}
    </div>
  );
}
