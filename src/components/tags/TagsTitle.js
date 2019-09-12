import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';
import { useTags } from 'hooks/UseTags';
import { getTagsFromIds } from 'utils/TagUtils';

export function TagsTitle(props) {
    const tagApi = useTags();
    const tags = getTagsFromIds(tagApi.tags, props.tagIds);

    return tags ? (
        <React.Fragment>
            {tags.map(tag => (
                <Tag key={tag.id} color={tag.color}>{tag.title}</Tag>
            ))}
        </React.Fragment>
    ) : (<span>&nbsp;</span>);
}

TagsTitle.propTypes = {
    tagIds: PropTypes.array
};

export default TagsTitle;