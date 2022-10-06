import {Modal, Table} from "antd";
import {useAtom} from "jotai";
import {selectedUserAtom} from "../core/GlobalState.js";


const SearchUserDialog = ({isOpen, data, onClose}) => {
    const [_, setSelectedUser] = useAtom(selectedUserAtom)
    const COLUMNS = [
        {title: 'Full Name', dataIndex: 'FullName', key: 'FullName', className: 'tb-header1',width: 200},
        {title: 'Client', dataIndex: 'Account', key: 'Account', className: 'tb-header1'},
        {title: 'Building', dataIndex: 'Building', key: 'Building', className: 'tb-header1',width: 250},
        {title: 'Department', dataIndex: 'Department', key: 'Department', className: 'tb-header1',width: 250},
        {title: 'Email', dataIndex: 'EmailAddress', key: 'EmailAddress', className: 'tb-header1',width: 150},
        {title: 'Login ID', dataIndex: 'LoginID', key: 'LoginID', className: 'tb-header1',width: 150},
        {title: 'VIP', dataIndex: 'VIP', key: 'VIP', className: 'tb-header1',width: 70},
        {title: 'Network Login', dataIndex: 'NetworkLogin', key: 'NetworkLogin', className: 'tb-header1'},
        {title: 'SupportPerson', dataIndex: 'SupportPerson', key: 'SupportPerson', className: 'tb-header1'},
    ]

    const onRow = (record, rowIndex) => {
        return {
            onClick: event => {
                setSelectedUser(record)
                onClose()
            },
        };
    }

    return (
        <Modal
            title="User Search"
            centered
            open={isOpen}
            onOk={() => onClose()}
            onCancel={() => onClose()}
            width={1200}
        >

            <Table
                columns={COLUMNS}
                className={'app-table scroll-style'}
                size={"small"}
                onRow={onRow}
                dataSource={data}
                scroll={{x: 'max-content'}}
                rowClassName={(record, index) => record['SupportPerson'] === 'Yes' ? `support-person-row ${index % 2 === 0 ? 'table-row-decorate' : ''} def-table-class` : `${index % 2 === 0 ? 'table-row-decorate' : ''} def-table-class`}
                rowKey={record => record.LoginID}
            />
        </Modal>
    )
}

export default SearchUserDialog