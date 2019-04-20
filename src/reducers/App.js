import { getDefaultSelectedFilter } from "../data/DataFilters";

const App = () => (state = {
    user: null,
    selectedTaskIds: [],
    selectedFilter: getDefaultSelectedFilter(),
    selectedFilterDate: null,
    categoryManager: {
        visible: false,
        category: 'contexts',
        objectId: null
    },
    filterManager: {
        visible: false,
        filterId: null
    },
    taskTemplateManager: {
        visible: false,
        taskTemplateId: null
    },
    settingManager: {
        visible: false
    },
    batchAddTasks: {
        visible: false
    }
}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_TASK_IDS':
            return {
                ...state,
                selectedTaskIds: action.taskIds
            };
        case 'SET_SELECTED_FILTER':
            return {
                ...state,
                selectedFilter: action.filter,
                selectedFilterDate: action.date
            };
        case 'SET_CATEGORY_MANAGER_OPTIONS':
            return {
                ...state,
                categoryManager: {
                    visible: 'visible' in action ? action.visible : state.categoryManager.visible,
                    category: 'category' in action ? action.category : state.categoryManager.category,
                    objectId: 'objectId' in action ? action.objectId : state.categoryManager.objectId
                }
            };
        case 'SET_FILTER_MANAGER_OPTIONS':
            return {
                ...state,
                filterManager: {
                    visible: 'visible' in action ? action.visible : state.filterManager.visible,
                    filterId: 'filterId' in action ? action.filterId : state.filterManager.filterId
                }
            };
        case 'SET_TASK_TEMPLATE_MANAGER_OPTIONS':
            return {
                ...state,
                taskTemplateManager: {
                    visible: 'visible' in action ? action.visible : state.taskTemplateManager.visible,
                    taskTemplateId: 'taskTemplateId' in action ? action.taskTemplateId : state.taskTemplateManager.taskTemplateId
                }
            };
        case 'SET_SETTING_MANAGER_OPTIONS':
            return {
                ...state,
                settingManager: {
                    visible: 'visible' in action ? action.visible : state.settingManager.visible
                }
            };
        case 'SET_BATCH_ADD_TASKS_OPTIONS':
            return {
                ...state,
                batchAddTasks: {
                    visible: 'visible' in action ? action.visible : state.batchAddTasks.visible
                }
            };
        default:
            return state;
    }
}

export default App;