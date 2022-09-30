import {Table, Tag} from "antd";
import GanttTimeLineView from "./GanttTimeLineView.jsx";
import {formatDateTime} from "../core/AppUtils";


const CallsGrid = () => {

    const columns = [
        {title: "Sr No", dataIndex: "sr_no", key: "sr_no", className: 'tb-header1'},
        {title: "Call ID", dataIndex: "call_id", key: "call_id", className: 'tb-header1'},
        {
            title: "Start Time", dataIndex: "start_time", key: "start_time", className: 'tb-header1',
            render: (_, {start_time}) => {
                return <span>{formatDateTime(start_time)}</span>
            }
        },
        {
            title: "End Time",
            dataIndex: "end_time",
            key: "end_time",
            className: 'tb-header1',
            render: (_, {end_time}) => {
                return <span>{formatDateTime(end_time)}</span>
            }
        },
        {title: "Source", dataIndex: "source", key: "source", className: 'tb-header1'},
        {title: "Duration", dataIndex: "duration", key: "duration", className: 'tb-header1'},
        {
            title: "Status", dataIndex: "status", key: "status", className: 'tb-header1', render: (_, {status}) => {
                return (
                    <Tag color={'geekblue'}>
                        {status.toUpperCase()}
                    </Tag>
                )
            }
        },
    ]

    const data = [
        {
            sr_no: 1,
            call_id: "123456",
            start_time: new Date(2021, 1, 1, 8, 0, 0),
            end_time: new Date(2021, 1, 1, 8, 4, 24),
            source: "Calls",
            duration: "00:04:24",
            status: "Completed"
        },
    ]

    return (
        <div className="calls-grid">
            <div className={'font-semibold'} style={{fontSize: 14}}>Total Calls</div>

            <div className={'mt-1 w-full'}>
                <Table
                    size={'small'}
                    columns={columns}
                    dataSource={data}
                    rowKey={(record) => record.call_id}
                    expandable={{
                        expandedRowRender: record => <GanttTimeLineView data={record}/>,
                    }}
                />
            </div>
        </div>
    )
}

export default CallsGrid