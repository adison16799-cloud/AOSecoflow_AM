export const Input = ({
  label,
  type = 'text',
  placeholder = '',
  value = '',
  onChange = () => {},
  error = '',
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2 text-aeco-light-text dark:text-aeco-dark-text">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-lg
          bg-aeco-light-card dark:bg-aeco-dark-card
          border border-aeco-light-border dark:border-aeco-dark-border
          text-aeco-light-text dark:text-aeco-dark-text
          focus:outline-none focus:ring-2 focus:ring-aeco-cyan
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          ${error ? 'border-aeco-danger focus:ring-aeco-danger' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-aeco-danger text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
