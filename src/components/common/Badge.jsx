export const Badge = ({
  children,
  variant = 'success',
  className = '',
}) => {
  const variantClasses = {
    success: 'bg-aeco-success/20 text-aeco-success border border-aeco-success/30',
    warning: 'bg-aeco-warning/20 text-aeco-warning border border-aeco-warning/30',
    danger: 'bg-aeco-danger/20 text-aeco-danger border border-aeco-danger/30',
    info: 'bg-aeco-cyan/20 text-aeco-cyan border border-aeco-cyan/30',
    cyan: 'bg-aeco-cyan/20 text-aeco-cyan border border-aeco-cyan/30',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center px-2.5 py-0.5 
        rounded-full text-xs font-semibold
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
