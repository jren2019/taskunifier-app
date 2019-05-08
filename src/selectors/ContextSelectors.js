import { createSelector } from 'reselect';
import { filterByVisibleState } from 'utils/CategoryUtils';

const getContexts = state => state.contexts;

export const getContextsFilteredByVisibleState = createSelector(
    [getContexts],
    (contexts) => {
        return filterByVisibleState(contexts.all);
    }
);