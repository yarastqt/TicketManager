import throttle from 'lodash/throttle';

export function loadState() {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}

function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {}
}

export function persistStore(store, config) {
    store.subscribe(throttle(() => {
        const state = store.getState();
        const persistedState = config.whiteList.reduce((partialState, storeKey) => {
            partialState[storeKey] = state[storeKey];
            return partialState;
        }, {});

        saveState(persistedState);
    }, 1000));
}