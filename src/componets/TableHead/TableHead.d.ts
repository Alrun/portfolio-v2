export interface TableHeadProps {
    // data: {
    //     id: string;
    //     items: {
    //         id: string;
    //         title: string;
    //     }[];
    // }[];
    handleReorder: ({ dragEl, targetEl }: any) => void;
    handleResize: (width: any, cursor: any) => void;
    columns: TableColumnInterface[];
    tableRef: any;
    bodyRef: any;
}
