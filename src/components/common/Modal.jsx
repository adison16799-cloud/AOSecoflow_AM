export const Modal = ({
  isOpen = false,
  onClose = () => {},
  title = '',
  children,
  footer = null,
  size = 'md',
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative bg-aeco-light-card dark:bg-aeco-dark-card
          border border-aeco-light-border dark:border-aeco-dark-border
          rounded-lg shadow-lg
          ${sizeClasses[size]}
          max-h-[90vh] overflow-y-auto
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-aeco-light-border dark:border-aeco-dark-border">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-aeco-light-text/60 dark:text-aeco-dark-text/60 hover:text-aeco-light-text dark:hover:text-aeco-dark-text"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 p-6 border-t border-aeco-light-border dark:border-aeco-dark-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
