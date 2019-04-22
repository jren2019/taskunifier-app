import { connect } from 'react-redux';
import { clearProcesses, setProcessesVisible, deleteNotification } from '../actions/ProcessActions';
import withBusyCheck from '../components/common/WithBusyCheck';

function withProcesses(Component) {
    const mapStateToProps = state => ({
        busy: state.processes.busy,
        processes: state.processes
    });

    const mapDispatchToProps = dispatch => ({
        setProcessesVisible: visible => dispatch(setProcessesVisible(visible)),
        clearProcesses: () => dispatch(clearProcesses()),
        deleteNotification: notificationId => dispatch(deleteNotification(notificationId))
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(withBusyCheck(Component));
}

export default withProcesses;