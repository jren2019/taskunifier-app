import uuid from 'uuid';
import {
    loadFromFile,
    loadFromServer,
    saveToFile
} from 'actions/ActionUtils';
import { sendRequest } from 'actions/RequestActions';
import { updateProcess } from 'actions/ThreadActions';
import { getConfig } from 'config/Config';
import { getSettings } from 'selectors/SettingSelectors';

export const loadSettingsFromFile = (file, core = false) => {
    return async dispatch => {
        const data = await dispatch(loadFromFile('settings', file));
        await dispatch(setSettings(data, core));
    };
};

export function saveSettingsToFile(file, data) {
    return saveToFile('settings', file, data);
}

export const loadSettingsFromServer = (core = false) => {
    return async dispatch => {
        const data = await dispatch(loadFromServer('settings', { skipSetLoaded: true }));
        await dispatch(setSettings(data.settings, core));
    };
};

export function saveSettingsToServer(updatedSettings) {
    return async (dispatch, getState) => {
        const state = getState();
        const settings = getSettings(state);
        const processId = uuid();

        try {
            const result = await sendRequest(
                settings,
                {
                    withCredentials: true,
                    method: 'PUT',
                    url: `${getConfig().apiUrl}/v1/settings`,
                    data: updatedSettings,
                    responseType: 'json'
                });

            return result.data;
        } catch (error) {
            dispatch(updateProcess({
                id: processId,
                state: 'ERROR',
                title: `Save settings to server`,
                error: error.toString()
            }));

            throw error;
        }
    };
}

export const setSettings = (settings, core = false) => {
    return async dispatch => {
        await dispatch({
            type: 'SET_SETTINGS',
            core,
            settings
        });
    };
};

export function updateSettings(settings, options = { skipServerUpdate: false }) {
    return async dispatch => {
        await dispatch({
            type: 'UPDATE_SETTINGS',
            settings
        });

        if (!options || options.skipServerUpdate !== true) {
            await dispatch(saveSettingsToServer(settings));
        }
    };
}

export function setSelectedView(view) {
    return updateSettings({
        selectedView: view
    }, { skipServerUpdate: true });
}

export function setSelectedCalendarView(view) {
    return updateSettings({
        selectedCalendarView: view
    }, { skipServerUpdate: true });
}

export function setShowCompletedTasks(show) {
    return updateSettings({
        showCompletedTasks: show
    }, { skipServerUpdate: false });
}

export function setCalendarDateMode(mode) {
    return updateSettings({
        calendarDateMode: mode
    }, { skipServerUpdate: true });
}