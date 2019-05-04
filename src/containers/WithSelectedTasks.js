import { connect } from 'react-redux';
import { addTask, deleteTask, updateTask } from 'actions/TaskActions';
import { filterObjects } from 'utils/CategoryUtils';
import { setSelectedTaskIds } from 'actions/AppActions';
import withBusyCheck from 'containers/WithBusyCheck';

function withSelectedTasks(Component) {
    const mapStateToProps = state => ({
        selectedTaskIds: state.app.selectedTaskIds,
        selectedTasks: filterObjects(state.tasks.all.filter(task => state.app.selectedTaskIds.includes(task.id)))
    });

    const mapDispatchToProps = dispatch => ({
        addTask: task => dispatch(addTask(task)),
        updateTask: task => dispatch(updateTask(task)),
        deleteTask: taskId => dispatch(deleteTask(taskId)),
        setSelectedTaskIds: taskIds => dispatch(setSelectedTaskIds(taskIds))
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(withBusyCheck(Component));
}

export default withSelectedTasks;