interface ProfileAvatarProps {
  email: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ProfileAvatar({ email, size = 'sm' }: ProfileAvatarProps) {
  // Get first two letters of email
  const initials = email
    .split('@')[0]
    .substring(0, 2)
    .toUpperCase();

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl'
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full bg-brand flex items-center justify-center text-white font-medium`}
    >
      {initials}
    </div>
  );
}
