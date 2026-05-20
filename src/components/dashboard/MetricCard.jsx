export const MetricCard = ({
  icon = '📊',
  title = 'Metric',
  value = '0',
  unit = '',
  trend = null, // { value: number, isPositive: boolean }
  variant = 'cyan', // cyan, success, warning, danger
  className = '',
}) => {
  const variantClasses = {
    cyan: 'border-aeco-cyan/20 bg-aeco-cyan/5',
    success: 'border-aeco-success/20 bg-aeco-success/5',
    warning: 'border-aeco-warning/20 bg-aeco-warning/5',
    danger: 'border-aeco-danger/20 bg-aeco-danger/5',
  };

  const trendColor = trend?.isPositive ? 'text-aeco-success' : 'text-aeco-danger';

  return (
    <div
      className={`
        bg-aeco-light-card dark:bg-aeco-dark-card
        border border-aeco-light-border dark:border-aeco-dark-border
        rounded-lg p-6 transition-all duration-200
        hover:shadow-lg hover:scale-105
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        {trend && (
          <div className={`text-sm font-semibold ${trendColor} flex items-center gap-1`}>
            {trend.isPositive ? '↑' : '↓'}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>

      {/* Title */}
      <p className="text-aeco-light-text/70 dark:text-aeco-dark-text/70 text-sm mb-2">
        {title}
      </p>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-bold text-aeco-light-text dark:text-aeco-dark-text">
          {value}
        </h3>
        {unit && (
          <span className="text-aeco-light-text/60 dark:text-aeco-dark-text/60 text-sm">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
