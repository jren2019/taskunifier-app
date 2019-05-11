import moment from 'moment';
import { createSelector } from 'reselect';
import { getDefaultTaskFields } from 'data/DataTaskFields';
import { getSelectedTaskFilter, getSelectedTaskFilterDate } from 'selectors/AppSelectors';
import { getSettings } from 'selectors/SettingSelectors';
import { getTaskFields } from 'selectors/TaskFieldSelectors';
import { store } from 'store/Store';
import { filterByVisibleState } from 'utils/CategoryUtils';
import { applyFilter } from 'utils/FilterUtils';
import { sortObjects } from 'utils/SorterUtils';

export const getTasks = state => state.tasks;

export const getTasksFilteredByVisibleState = createSelector(
    [getTasks],
    (tasks) => {
        return filterByVisibleState(tasks);
    }
);

export const getTasksFilteredBySelectedFilter = createSelector(
    [getTasks, getSelectedTaskFilter, getSelectedTaskFilterDate, getTaskFields, getSettings],
    (tasks, selectedTaskFilter, selectedTaskFilterDate, taskFields, settings) => {
        const fields = getDefaultTaskFields(settings).concat(filterByVisibleState(taskFields));

        const filteredTasks = tasks.filter(task => {
            if (!selectedTaskFilterDate || moment(task.creationDate).isAfter(moment(selectedTaskFilterDate))) {
                return true;
            }

            return applyFilter(selectedTaskFilter, task, fields);
        });

        return sortObjects(filteredTasks, fields, selectedTaskFilter, store.getState());
    }
);