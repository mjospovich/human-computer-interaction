interface ArrowIconProps {
  className?: string;
}

export const ArrowIcon = ({ className = "w-4 h-4" }: ArrowIconProps) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M5 12h14M12 5l7 7-7 7"
      />
    </svg>
  );
};
