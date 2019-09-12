import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePrevious } from 'hooks/UsePrevious';
import { useTaskReminders } from 'hooks/UseTaskReminders';

function ReminderChecker(props) {
    const taskReminderApi = useTaskReminders(props.date);
    const prevTasks = usePrevious(taskReminderApi.tasks) || [];

    useEffect(() => {
        const prevTaskIds = prevTasks.map(task => task.id);
        const taskIds = taskReminderApi.tasks.map(task => task.id);

        if (!taskIds.every(taskId => prevTaskIds.includes(taskId))) {
            props.show();
        }
    });

    return null;
}

ReminderChecker.propTypes = {
    date: PropTypes.string.isRequired,
    show: PropTypes.func.isRequired
};

export default ReminderChecker;