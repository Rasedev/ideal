


// import { Card, Typography } from "antd";
// const { Text } = Typography;

// const StatsCard = ({ title, value, color }) => (
//   <Card className="text-center shadow-sm hover:shadow-md transition">
//     <div className={`text-2xl font-bold text-${color}-600`}>{value || 0}</div>
//     <Text type="secondary">{title}</Text>
//   </Card>
// );

// export default StatsCard;







import { Card, Typography, Tooltip, Progress, Badge } from "antd";
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  InfoCircleOutlined 
} from "@ant-design/icons";

const { Text, Title } = Typography;

const StatsCard = ({ 
  title, 
  value, 
  color = "blue", 
  icon, 
  trend, 
  percentage, 
  subtitle,
  loading = false,
  badge,
  progress,
  onClick,
  tooltip 
}) => {
  const colorMap = {
    blue: { primary: '#1890ff', secondary: '#e6f7ff' },
    green: { primary: '#52c41a', secondary: '#f6ffed' },
    orange: { primary: '#fa8c16', secondary: '#fff7e6' },
    purple: { primary: '#722ed1', secondary: '#f9f0ff' },
    red: { primary: '#f5222d', secondary: '#fff1f0' },
    cyan: { primary: '#13c2c2', secondary: '#e6fffb' },
    gold: { primary: '#faad14', secondary: '#fffbe6' }
  };

  const colors = colorMap[color] || colorMap.blue;

  const renderTrend = () => {
    if (!trend) return null;
    
    const isPositive = trend === 'up';
    const TrendIcon = isPositive ? ArrowUpOutlined : ArrowDownOutlined;
    
    return (
      <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <TrendIcon className="text-xs" />
        <Text className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {percentage}%
        </Text>
      </div>
    );
  };

  const renderProgress = () => {
    if (!progress) return null;
    
    return (
      <div className="mt-2">
        <Progress 
          percent={progress.percent} 
          size="small" 
          strokeColor={colors.primary}
          showInfo={false}
        />
        {progress.label && (
          <Text type="secondary" className="text-xs">
            {progress.label}
          </Text>
        )}
      </div>
    );
  };

  return (
    <Tooltip title={tooltip}>
      <Card
        className={`text-center shadow-sm hover:shadow-md transition-all duration-300 cursor-${onClick ? 'pointer' : 'default'} border-0`}
        style={{ 
          background: `linear-gradient(135deg, ${colors.secondary} 0%, #ffffff 100%)`,
          borderLeft: `4px solid ${colors.primary}`
        }}
        onClick={onClick}
        loading={loading}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {icon && (
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: colors.primary + '20' }}
              >
                {icon}
              </div>
            )}
            <div className="text-left flex-1">
              <Text type="secondary" className="text-xs font-medium uppercase tracking-wide">
                {title}
                {tooltip && (
                  <InfoCircleOutlined className="ml-1 text-gray-400" />
                )}
              </Text>
              <div className="flex items-baseline space-x-2 mt-1">
                <Title level={3} className="!mb-0 !text-2xl" style={{ color: colors.primary }}>
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </Title>
                {badge && (
                  <Badge 
                    count={badge} 
                    size="small" 
                    style={{ 
                      backgroundColor: colors.primary,
                      fontSize: '10px'
                    }} 
                  />
                )}
              </div>
              {subtitle && (
                <Text type="secondary" className="text-xs">
                  {subtitle}
                </Text>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          {renderTrend()}
          <div className="flex-1"></div>
        </div>
        
        {renderProgress()}
      </Card>
    </Tooltip>
  );
};

export default StatsCard;









