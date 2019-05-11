import { isCoreSetting } from 'data/DataSettings';

export function filterSettings(settings, core) {
    const newSettings = {};

    Object.keys(settings).forEach(settingId => {
        if ((core && isCoreSetting(settingId)) || (!core && !isCoreSetting(settingId))) {
            newSettings[settingId] = settings[settingId];
            return;
        }
    });

    return newSettings;
}

export function getImportanceColor(importance, settings) {
    return settings['importance_' + (importance ? importance : 0)];
}

export function getPriorityColor(priority, settings) {
    return settings['priority_' + (priority ? priority : 'negative')];
}

export function getStatusColor(status, settings) {
    return settings['status_' + (status ? status : 'negative')];
}

export function getNoteBackgroundColor(note, index, settings) {
    return index % 2 === 0 ? settings.evenColor : settings.oddColor;
}

export function getTaskBackgroundColor(task, index, settings) {
    if (settings.showImportanceColor) {
        return getImportanceColor(task.importance, settings);
    }

    return index % 2 === 0 ? settings.evenColor : settings.oddColor;
}

export function getSorterBackgroundColor(sorter, index, settings) {
    return index % 2 === 0 ? settings.evenColor : settings.oddColor;
}

export function getLinkedObjectBackgroundColor(linkedObject, index, settings) {
    return index % 2 === 0 ? settings.evenColor : settings.oddColor;
}