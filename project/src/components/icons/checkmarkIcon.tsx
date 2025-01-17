interface CheckmarkIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CheckmarkIcon = ({ className, size = 'md' }: CheckmarkIconProps) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-16 h-16'
  };

  return (
    <svg
      className={`${className || sizeClasses[size]}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};
