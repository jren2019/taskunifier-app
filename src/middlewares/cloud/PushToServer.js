import React from 'react';
import { Modal } from 'antd';
import { Auth } from 'aws-amplify';
import uuid from 'uuid/v4';
import { changeId } from 'actions/ObjectActions';
import { sendRequest } from 'actions/RequestActions';
import { updateProcess } from 'actions/ThreadActions';
import CloudMaxObjectsReachedMessage from 'components/pro/CloudMaxObjectsReachedMessage';
import { getConfig } from 'config/Config';
import { getObjectById } from 'selectors/ObjectSelectors';
import { diff, getValue } from 'utils/ObjectUtils';

function pushObjectToServer(property, oldObject, newObject) {
    return async dispatch => {
        const processId = uuid();

        const diffObject = oldObject ? diff(newObject, oldObject) : { ...newObject };

        delete diffObject.id;
        delete diffObject.refIds;
        delete diffObject.state;
        delete diffObject.creationDate;
        delete diffObject.updateDate;

        if (oldObject && Object.keys(diffObject).length === 0) {
            return newObject;
        }

        try {
            const result = await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: oldObject ? 'PUT' : 'POST',
                    url: `${getConfig().apiUrl}/v1/${property}/${oldObject ? oldObject.id : ''}`,
                    data: diffObject,
                    responseType: 'json'
                });

            return result.data;
        } catch (error) {
            if (error.response &&
                error.response.status === 403 &&
                error.response.data &&
                error.response.data.code === 'max_objects_reached' &&
                error.response.data.subscriptionType === 'free') {
                Modal.info({
                    icon: null,
                    content: (<CloudMaxObjectsReachedMessage />)
                });
            } else {
                dispatch(updateProcess({
                    id: processId,
                    state: 'ERROR',
                    title: `Push "${newObject.title}" of type "${property}" to server`,
                    error: getValue('error', 'response.data.message', true) || error.toString()
                }));
            }

            throw error;
        }
    };
}

function deleteObjectFromServer(property, objectId) {
    return async dispatch => {
        const processId = uuid();

        try {
            await sendRequest(
                {
                    headers: {
                        Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
                    },
                    method: 'DELETE',
                    url: `${getConfig().apiUrl}/v1/${property}/${objectId}`
                });
        } catch (error) {
            dispatch(updateProcess({
                id: processId,
                state: 'ERROR',
                title: `Delete object of type "${property}" from server`,
                error: error.toString()
            }));

            throw error;
        }
    };
}

export const pushToServer = store => next => async action => {
    if (action.type === 'POST_ADD_OBJECT') {
        const remoteObject = await store.dispatch(pushObjectToServer(action.property, null, action.object));
        await store.dispatch(changeId(action.property, action.object.id, remoteObject.id));
        const addedObject = getObjectById(store.getState(), action.property, remoteObject.id);
        next(action);
        return addedObject;
    }

    if (action.type === 'POST_UPDATE_OBJECT') {
        await store.dispatch(pushObjectToServer(action.property, action.oldObject, action.newObject));
    }

    if (action.type === 'POST_DELETE_OBJECT') {
        const objectIds = Array.isArray(action.objectId) ? action.objectId : [action.objectId];
        const promises = objectIds.map(objectId => store.dispatch(deleteObjectFromServer(action.property, objectId)));
        await Promise.all(promises);
    }

    return next(action);
}