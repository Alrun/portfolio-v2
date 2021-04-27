import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TableState } from './table.d';

const initialState: TableState = {
    columns: [
        {
            head: [{ id: 'coin', title: '1Coin' }],
            width: 200,
            order: 1,
            resizable: true,
            reorderable: true,
            fixed: true
        },
        {
            head: [
                { id: 'quantity', title: '2Quantity' },
                { id: 'current_value', title: '2Current Value Value' }
            ],
            width: 150,
            order: 2,
            align: 'end',
            resizable: true,
            reorderable: false
            // fixed: true
        },
        {
            head: [
                { id: 'buy_price', title: '3Buy Price' },
                { id: 'current_price', title: '3Current Price' }
            ],
            width: 150,
            order: 3,
            align: 'end',
            resizable: false,
            reorderable: true,
            fixed: true
            // hidden: true
        },
        {
            head: [
                { id: 'change', title: '4Change' },
                { id: 'fee', title: '4(With Fee)' }
            ],
            align: 'end',
            width: 150,
            order: 4,
            resizable: true,
            reorderable: true
        },
        {
            head: [
                { id: 'sold', title: '5Sold Coins' },
                { id: 'gain', title: '5Gained' }
            ],
            align: 'end',
            width: 150,
            order: 5,
            resizable: true,
            reorderable: true
        },
        {
            head: [{ id: 'quota', title: '6Quota' }],
            width: 150,
            order: 6,
            align: 'center',
            resizable: true,
            reorderable: true
        },
        {
            head: [
                { id: 'wallet', title: '7Wallet' },
                { id: 'date', title: '7Buy Date' }
            ],
            width: 150,
            order: 7,
            resizable: true,
            reorderable: true
            // hidden: true
        },
        {
            head: [{ id: 'info', title: '' }],
            width: 150,
            order: 8,
            align: 'center',
            resizable: true,
            reorderable: true
            // hidden: true
            // fixed: true
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
            state.columns.forEach((item) => {
                const currentCol = payload.filter((el: { id: string }) => el.id === item.head[0].id);

                if (currentCol.length) {
                    item.order = currentCol[0].order;
                }
            });
        },
        resize: (state, { payload }: PayloadAction<any>) => {
            state.columns.filter((col) => col.head[0].id === payload.id)[0].width = payload.width;
        },
        setData: (state, { payload }: PayloadAction<any>) => {
            state.items = payload.items;
        },
        setGroupOpen: (state, { payload }: PayloadAction<any>) => {
            if (!state.groupOpen.includes(payload)) {
                state.groupOpen.push(payload);
            } else {
                state.groupOpen = state.groupOpen.filter((item) => item !== payload);
            }
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
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, { payload }: PayloadAction<number>) => {
        //     state.value += payload;
        // },
        // // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // incrementAsync: (state, { payload }: PayloadAction<number>) => {
        //     // eslint-disable-next-line no-param-reassign
        //     state.isLoading = true;
        // }
    }
});

export const { reorder, resize, setData, setGroupOpen } = table.actions;

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
