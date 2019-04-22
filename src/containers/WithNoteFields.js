import { connect } from 'react-redux';
import { addNoteField, updateNoteField, deleteNoteField } from '../actions/NoteFieldActions';
import { getDefaultNoteFields } from '../data/DataNoteFields';
import { filterObjects } from '../utils/CategoryUtils';
import withBusyCheck from '../components/common/WithBusyCheck';

function withNoteFields(Component) {
    const mapStateToProps = state => ({
        busy: state.processes.busy,
        noteFields: getDefaultNoteFields(state.settings).concat(filterObjects(state.noteFields))
    });

    const mapDispatchToProps = dispatch => ({
        addNoteField: field => dispatch(addNoteField(field)),
        updateNoteField: field => dispatch(updateNoteField(field)),
        deleteNoteField: fieldId => dispatch(deleteNoteField(fieldId))
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(withBusyCheck(Component));
}

export default withNoteFields;