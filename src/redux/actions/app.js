import C from '../constants';

export const appLoading = (bool) => ({
    type: C.APP_LOADING,
    bool
});

export const appError = (err) => ({
    type: C.APP_ERROR,
    err
});
