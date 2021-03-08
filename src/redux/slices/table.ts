import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableColumnsInterface {
    width: number;
    order: number;
    head: {
        id: string; // TODO Add nonEmptyString type
        title: string;
    }[];
    isHidden?: boolean;
    isFixed?: boolean;
}

export interface TableState {
    columns: TableColumnsInterface[];
    sort: any;
    items: any; // TODO Add types for items
    groupOpen: string[];
    pinned: string[];
    loading: boolean;
    error: string;
}

const initialState: TableState = {
    columns: [
        {
            width: 200,
            order: 1,
            head: [{ id: 'coin', title: 'Coin' }],
            isFixed: true
        },
        {
            width: 150,
            order: 2,
            head: [
                { id: 'quantity', title: 'Quantity' },
                { id: 'current_value', title: 'Current Value Value' }
            ],
            // isFixed: true
        },
        {
            width: 150,
            order: 3,
            head: [
                { id: 'buy_price', title: 'Buy Price' },
                { id: 'current_price', title: 'Current Price' }
            ],
            isFixed: true,
            isHidden: true
        },
        {
            width: 150,
            order: 4,
            head: [
                { id: 'change', title: 'Change' },
                { id: 'fee', title: '(With Fee)' }
            ]
        },
        {
            width: 150,
            order: 5,
            head: [
                { id: 'sold', title: 'Sold Coins' },
                { id: 'gain', title: 'Gained' }
            ]
        },
        {
            width: 150,
            order: 6,
            head: [{ id: 'quota', title: 'Quota' }]
        },
        {
            width: 150,
            order: 7,
            head: [
                { id: 'wallet', title: 'Wallet' },
                { id: 'date', title: 'Buy Date' }
            ]
            // isHidden: true
        },
        {
            width: 150,
            order: 8,
            head: [{ id: 'info', title: '' }],
            // isHidden: true
            // isFixed: true
        }
    ],
    sort: {
        by: 'coin',
        order: 'desc'
    },
    items: [],
    groupOpen: [],
    pinned: [],
    loading: false,
    error: ''
};

export const table = createSlice({
    name: 'table',
    initialState,
    reducers: {
        reorder: (state, { payload }: PayloadAction<any>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // state.columns[payload.targetEl.id].order = payload.dragEl.order;
            // console.log(payload);

            // console.log('redux ', payload);

            state.columns.forEach((item) => {
                const currentCol = payload.filter((el: { id: string }) => el.id === item.head[0].id);

                if (currentCol.length) {
                    // eslint-disable-next-line no-param-reassign
                    item.order = currentCol[0].order;
                }
            });

            // eslint-disable-next-line no-return-assign
            // payload.forEach((item: any): void => {
            //     console.log(state.columns);
            //     // @ts-ignore
            //     // state.columns[`${item.id}`].order = item.order;
            // });
        },
        setData: (state, { payload }: PayloadAction<any>) => {
            // eslint-disable-next-line no-param-reassign
            state.items = payload.items;
        }
        // ,// increment: (state) => {
        //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //     // doesn't actually mutate the state because it uses the Immer library,
        //     // which detects changes to a "draft state" and produces a brand new
        //     // immutable state based off those changes
        //     // eslint-disable-next-line no-param-reassign
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     // eslint-disable-next-line no-param-reassign
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, { payload }: PayloadAction<number>) => {
        //     // eslint-disable-next-line no-param-reassign
        //     state.value += payload;
        // },
        // // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // incrementAsync: (state, { payload }: PayloadAction<number>) => {
        //     // eslint-disable-next-line no-param-reassign
        //     state.isLoading = true;
        // }
    }
});

export const { reorder, setData } = table.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: any) => (dispatch: (arg0: { payload: any; type: string }) => void) => {
//     setTimeout(() => {
//         dispatch(incrementByAmount(amount));
//     }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const tableSelector = (state: { table: TableState }) => state.table;

export default table.reducer;
