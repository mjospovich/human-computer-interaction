interface RatingProps {
  value: number; // Value between 0 and 100
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Rating({ value, size = 'md', className = '' }: RatingProps) {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  // Calculate circle properties
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - normalizedValue) / 100) * circumference;

  // Size variants
  const sizeClasses = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-20 h-20 text-2xl',
    lg: 'w-32 h-32 text-3xl'
  };

  // Get color based on percentage
  const getProgressColor = (value: number): string => {
    if (value < 50) return 'stroke-red-500';
    if (value < 65) return 'stroke-orange-500';
    if (value < 75) return 'stroke-yellow-500';
    if (value < 90) return 'stroke-green-500';
    return 'stroke-emerald-500';
  };

  // Get text color to match progress color
  const getTextColor = (value: number): string => {
    if (value < 50) return 'text-red-500';
    if (value < 65) return 'text-orange-500';
    if (value < 75) return 'text-yellow-500';
    if (value < 90) return 'text-green-500';
    return 'text-emerald-500';
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className="fill-none stroke-gray-200"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          className={`fill-none transition-all duration-300 ease-in-out ${getProgressColor(normalizedValue)}`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
        />
      </svg>
      {/* Rating number */}
      <div className={`absolute inset-0 flex items-center justify-center font-bold ${getTextColor(normalizedValue)}`}>
        {normalizedValue}%
      </div>
    </div>
  );
}
