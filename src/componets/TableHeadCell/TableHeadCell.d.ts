export interface TableHeadCellProps {
    id: string;
    isDraggable: boolean;
    item: any;
    isResizable?: boolean;
    width: number;
    align?: 'start' | 'center' | 'end';
    handleResize: any;
}
