import C from '../constants';

export const initialState = {
    loading: false,
    error: ''
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case C.APP_LOADING: {
            return {
                ...state,
                loading: action.bool
            };
        }

        case C.APP_ERROR: {
            return {
                ...state,
                error: action.err,
                loading: false
            };
        }

        default:
            return state;
    }
};

export default reducer;
