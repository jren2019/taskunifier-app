import React from 'react';
import { Button, Empty, message } from 'antd';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { getConfig } from 'config/Config';
import withSession from 'containers/WithSession';
import { openExternalLink } from 'utils/ElectronUtils';

export function ProLockedMessage({ info, session, buyItem }) {
    if (process.env.REACT_APP_MODE === 'electron') {
        const onClick = () => {
            openExternalLink(getConfig().appUrl);
        };

        let description = 'This feature requires a TaskUnifier App Pro license !';

        if (info) {
            description = 'TaskUnifier Pro has not been activated !';
        }

        return (
            <Empty
                image={(<Icon color="#ffecb3" icon="lock" size={64} />)}
                description={description}>
                <Button onClick={onClick}>Click here to get more information</Button>
            </Empty>
        );
    } else {
        const onClick = () => {
            openExternalLink(getConfig().cloudUrl);
        };

        const onBuyItem = async () => {
            message.info('Redirecting to Paypal...', 5);
            await buyItem(getConfig().cloudItemSku, session.user.id, session.user.email);
        };

        let description = 'This feature requires a TaskUnifier Cloud Pro subscription !';

        if (info) {
            description = 'TaskUnifier Pro has not been activated !';
        }

        return (
            <Empty
                image={(<Icon color="#ffecb3" icon="lock" size={64} />)}
                description={description}>
                <Button onClick={onClick} style={{ marginRight: 10 }}>Click here to get more information</Button>
                <Button type="primary" onClick={onBuyItem}>Subscribe to TaskUnifier Cloud Pro</Button>
            </Empty>
        );
    }
}

ProLockedMessage.propTypes = {
    info: PropTypes.bool,
    session: PropTypes.object.isRequired,
    buyItem: PropTypes.func.isRequired
};

export default withSession(ProLockedMessage);