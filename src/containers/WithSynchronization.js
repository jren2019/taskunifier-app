import { connect } from 'react-redux';
import { getAccountInfo } from 'actions/toodledo/AccountInfo';
import { authorize, getRefreshedToken, getToken } from 'actions/toodledo/Authorization';
import withBusyCheck from 'containers/WithBusyCheck';
import { getToodledoData } from 'selectors/SynchronizationSelectors';

function withSynchronization(Component) {
    const mapStateToProps = state => ({
        toodledo: getToodledoData(state)
    });

    const mapDispatchToProps = dispatch => ({
        authorize: () => dispatch(authorize()),
        getToken: code => dispatch(getToken(code)),
        getRefreshedToken: () => dispatch(getRefreshedToken()),
        getAccountInfo: () => dispatch(getAccountInfo())
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(withBusyCheck(Component));
}

export default withSynchronization;