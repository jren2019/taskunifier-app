import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import withApp from '../../containers/WithApp';
import Icon from '../common/Icon';
import TaskFilterManager from './TaskFilterManager';

function ModalTaskFilterManager(props) {
    const onCloseTaskFilterManager = () => {
        props.setTaskFilterManagerOptions({ visible: false });
    };

    const onTaskFilterSelection = taskFilterId => {
        props.setTaskFilterManagerOptions({ taskFilterId });
    };

    return (
        <Modal
            title={<Icon icon="filter" text="Task Filter Manager" />}
            visible={props.taskFilterManager.visible}
            width="80%"
            closable={false}
            footer={
                <Button onClick={onCloseTaskFilterManager}>
                    Close
                </Button>
            }>
            <TaskFilterManager
                taskFilterId={props.taskFilterManager.taskFilterId}
                onTaskFilterSelection={onTaskFilterSelection} />
        </Modal>
    );
}

ModalTaskFilterManager.propTypes = {
    setTaskFilterManagerOptions: PropTypes.func.isRequired,
    taskFilterManager: PropTypes.object.isRequired
};

export default withApp(ModalTaskFilterManager);