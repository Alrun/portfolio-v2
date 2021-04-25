import { RippleProps } from '../Ripple/Ripple.d'

export interface ButtonProps {
    variant?: 'default' | 'filled' | 'outline';
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'success' | 'danger';
    children?: JSX.Element | string;
    isDisabled?: boolean;
    tabIndex?: number;
    addClasses?: string;
    iconStart?: JSX.Element;
    iconEnd?: JSX.Element;
    href?: string;
    ripple?: RippleProps['ripple'];
    /**
     * Optional click handler
     */
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}
