export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick = () => {},
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-aeco-cyan text-white hover:bg-aeco-cyan-dark',
    secondary: 'bg-transparent border border-aeco-cyan text-aeco-cyan hover:bg-aeco-cyan/10',
    danger: 'bg-aeco-danger text-white hover:bg-aeco-danger/90',
    success: 'bg-aeco-success text-white hover:bg-aeco-success/90',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`
        rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
