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
    columns: any;
    tableRef: any;
    bodyRef: any;
}
