export interface CheckboxProps {
    value?: string;
    isChecked?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;
    variant?: 'default' | 'indeterminate';
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'danger';
    name?: string;
    ripple?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: JSX.Element | string;
}
