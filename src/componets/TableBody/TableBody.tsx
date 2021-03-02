import React from 'react';

import TableRow, { TableRowDataInterface } from '../TableRow/TableRow';

import classes from './TableBody.module.scss';
import useScroll from '../../hooks/useScroll';

export interface TableBodyData {
    currency: string;
    items: TableRowDataInterface[];
}

export interface TableBodyProps {
    data: TableBodyData;
    isLoading: boolean;
    columns: any;
}

export default function TableBody({ data: { currency, items }, isLoading, columns }: TableBodyProps) {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const rendersCount = React.useRef<number>(0);

    // React.useLayoutEffect(() => {
    //     handleSetWidth(rootRef.current?.scrollWidth);
    // }, [handleSetWidth]);

    // const scroll = useScroll(rootRef, 0);
    // const requestRef = React.useRef<any>();
    // const previousTimeRef = React.useRef<any>();
    //
    // const animate = () => {
    //     // if (previousTimeRef.current !== undefined) {
    //         // const deltaTime = time - previousTimeRef.current;
    //
    //         // Pass on a function to the setter of the state
    //         // to make sure we always have the latest state
    //         handleSetWidth(scroll.position.x);
    //         // setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
    //     // }
    //     // previousTimeRef.current = time;
    //     requestRef.current = requestAnimationFrame(animate);
    // }
    //
    // React.useEffect(() => {
    //     requestRef.current = requestAnimationFrame(animate);
    //     // setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
    //
    //     return () => cancelAnimationFrame(requestRef.current);
    // }, [animate]); // Make sure the effect runs only once

    // React.useEffect(() => {
    //     handleSetWidth(scroll.position.x);
    // }, [handleSetWidth, scroll.position.x]);

    // const handleScroll = (e: any) => {
    //     handleSetWidth(e.target.scrollLeft);
    //     // console.log(e.target.scrollLeft);
    // }

    return (
        <>
            <TableRow row={items[0]} key={items[0].coin} columns={columns} />
            <div className={classes.group}>
                <TableRow row={items[0]} key={items[0].coin} columns={columns} />
                <TableRow row={items[1]} key={items[1].coin} columns={columns} />
            </div>
            {!!items.length && items.map((item) => <TableRow row={item} key={item.coin} columns={columns} />)}
            {/* eslint-disable-next-line no-plusplus */}
            <b>Table Body RENDER COUNT: {++rendersCount.current}</b>
        </>
    );
}
