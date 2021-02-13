import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    value: number;
    isLoading: boolean;
}

const initialState: CounterState = {
    value: 0,
    isLoading: false
};

export const counter = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, { payload }: PayloadAction<number>) => {
            state.value += payload;
        },
        incrementAsync: (state, { payload }: PayloadAction<number>) => {
            state.isLoading = true;
        }
    }
});

export const { increment, decrement, incrementByAmount, incrementAsync } = counter.actions;

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
export const counterSelector = (state: { counter: CounterState }) => state.counter.value;

export default counter.reducer;
