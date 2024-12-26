interface LoadingWheelProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
}

export function LoadingWheel({ size = 'md', className = '', message }: LoadingWheelProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <svg className={`animate-spin ${sizeClasses[size]} ${className}`} viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="35"
          className="stroke-gray-200"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          className="stroke-brand"
          strokeWidth="8"
          fill="none"
          strokeDasharray="220"
          strokeDashoffset="60"
          strokeLinecap="round"
        />
      </svg>
      {message && (
        <p className="text-lg text-secondary-text-black">{message}</p>
      )}
    </div>
  );
}
