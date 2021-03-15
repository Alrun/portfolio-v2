import React from 'react';
// import { TableColumnsInterface } from '../../redux/slices/table';

export interface TableFooterProps extends React.ComponentPropsWithoutRef<'div'> {
    columns: TableColumnsInterface[];
}
