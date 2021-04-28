import { Props } from 'tippy.js/index.d'

export interface TooltipChildProps {
    children: JSX.Element;
}

export interface TooltipProps extends Partial<Props> {
    content: JSX.Element | string;
    children: JSX.Element;
}
