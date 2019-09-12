import React from 'react';
import { Select } from 'antd';
import Icon from 'components/common/Icon';
import { useSortDirections } from 'hooks/UseSortDirections';

export const SortDirectionSelect = React.forwardRef(function SortDirectionSelect(props, ref) {
    const sortDirectionApi = useSortDirections();

    return (
        <Select ref={ref} allowClear={true} {...props}>
            {sortDirectionApi.sortDirections.map(sortDirection => (
                <Select.Option key={sortDirection.id} value={sortDirection.id}>
                    <Icon icon="circle" color={sortDirection.color} text={sortDirection.title} />
                </Select.Option>
            ))}
        </Select>
    );
});

SortDirectionSelect.displayName = 'ForwardRefSortDirectionSelect';

export default SortDirectionSelect;