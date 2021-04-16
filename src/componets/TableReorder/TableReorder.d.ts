
export interface TableReorderProps {
    id: string;
    headRef: React.RefObject<HTMLDivElement>;
    bodyRef: React.RefObject<HTMLDivElement>;
    handleReorder: (orders: any) => void;
    children: JSX.Element | JSX.Element[];
    minWidth?: number;
}
