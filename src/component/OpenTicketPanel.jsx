import {useEffect, useState} from "react";
import {myOpenTickets} from "../core/Api.js";
import {useAtom} from "jotai";
import {selectedUserAtom} from "../core/GlobalState.js";
import {debug} from "../core/Log.js";
import {Table} from "antd";


const OpenTicketPanel = () => {

    const [selectedUser] = useAtom(selectedUserAtom)
    const [openTickets, setOpenTickets] = useState({
        data: [],
        status: 1
    })

    const COLUMNS = [
        {title: 'Ticket Number', dataIndex: 'TicketNumber', key: 'TicketNumber', className: 'tb-header1'},
        {title: 'Created On', dataIndex: 'CreatedOn', key: 'CreatedOn', className: 'tb-header1'},
        {title: 'Summary', dataIndex: 'Summary', key: 'Summary', className: 'tb-header1'},
        {title: 'Status', dataIndex: 'StatusDescription', key: 'StatusDescription', className: 'tb-header1'},
        {title: 'Assigned Group', dataIndex: 'AssignedGroupName', key: 'AssignedGroupName', className: 'tb-header1'},
        {
            title: 'Assigned To',
            dataIndex: 'AssignedIndividualName',
            key: 'AssignedIndividualName',
            className: 'tb-header1'
        },
    ]

    useEffect(() => {
        if (selectedUser != null) {
            myOpenTickets(selectedUser['User_sk'])
                .then(x => {
                    setOpenTickets({
                        data: x,
                        status: 2
                    })
                })
                .catch(e => debug(e))
        } else {
            setOpenTickets({
                data: [],
                status: 2
            })
        }
    }, [selectedUser])

    return (
        <div className={'px-3 pb-6'}>
            {selectedUser && (
                <Table
                    columns={COLUMNS}
                    scroll={{ y: 300 }}
                    size={'small'}
                    pagination={false}
                    rowClassName={'cursor-pointer hover-border-row'}
                    dataSource={openTickets.data}
                    rowKey={'Ticket_sk'}
                    loading={openTickets.status === 1}
                />)
            }
        </div>
    )
}
export default OpenTicketPanel