import { Icon, type IconProps } from '@iconify/react';

export interface AppIconProps extends Omit<IconProps, 'icon'> {
  icon: string;
  size?: number | string;
}

export const AppIcon = ({ icon, size, className = '', ...props }: AppIconProps) => {
  return (
    <Icon
      icon={icon}
      width={size ?? props.width}
      height={size ?? props.height}
      className={className}
      {...props}
    />
  );
};

export { Icon } from '@iconify/react';
