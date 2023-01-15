import {Menu} from "antd";
export const menu = (
    <Menu
        selectable
        defaultSelectedKeys={['3']}
        items={[
            {
                key: '1',
                label: 'Item 1',
            },
            {
                key: '2',
                label: 'Item 2',
            },
            {
                key: '3',
                label: 'Item 3',
            },
        ]}
    />
);

