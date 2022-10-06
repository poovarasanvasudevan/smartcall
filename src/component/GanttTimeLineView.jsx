import "gantt-task-react/dist/index.css";
import {memo, useEffect, useRef, useState} from "react";
import {getSecondsBetweenDates, getTimeIntervalBetweenDatesSplitBySeconds} from "../core/AppUtils.js";
import {useHorizontalScroll, useSize,} from "../core/hooks.js";
import {useWindowWidth} from '@react-hook/window-size'
import {Popover} from "antd";

const GanttTimeLineView = memo(({data}) => {
    const [secondsPoint, setSecondsPoint] = useState([]);
    const minWidth = 130;
    const wRef = useRef();
    const scrollH = useHorizontalScroll()

    const windowWidth = useWindowWidth()

    const start_datetime = data.start_time;
    const end_datetime = data.end_time;

    const itemsList = [
        {
            start: new Date(2021, 1, 1, 8, 0, 0),
            end: new Date(2021, 1, 1, 8, 1, 14),
            name: 'Master Queue',
            id: 'Task 0',
            type: 'task',
            progress: 45,
            styles: {progressColor: '#00cfbc', progressSelectedColor: '#ff9e0d'},
        },

        {
            start: new Date(2021, 1, 1, 8, 1, 14),
            end: new Date(2021, 1, 1, 8, 2, 14),
            name: 'Agent Queue',
            id: 'Task 1',
            type: 'task',
            progress: 45,
            styles: {progressColor: '#ef5242', progressSelectedColor: '#ff9e0d'},
        },

        {
            start: new Date(2021, 1, 1, 8, 2, 14),
            end: new Date(2021, 1, 1, 8, 3, 14),
            name: 'Attended By Agent',
            id: 'Task 2',
            type: 'task',
            styles: {progressColor: '#00e676', progressSelectedColor: '#ff9e0d'},
        },

        {
            start: new Date(2021, 1, 1, 8, 3, 2),
            end: new Date(2021, 1, 1, 8, 4, 14),
            name: 'Call On Hold',
            id: 'Task 3',
            type: 'task',
            styles: {progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d'},
        },
    ]

    const [tasks, setTasks] = useState(itemsList);

    useEffect(() => {
        const s = getSecondsBetweenDates(new Date(start_datetime),new Date(end_datetime))
        const r = getTimeIntervalBetweenDatesSplitBySeconds(start_datetime,end_datetime, Math.floor(s / 12))
        setSecondsPoint(r)
        const ktask = itemsList.map(x => {
            x['duration'] = getSecondsBetweenDates(x.start, x.end)
            return x
        })
        setTasks(ktask)
    }, [])



    useEffect(() => {
        const singleSecondWidth = (windowWidth - 95) / getSecondsBetweenDates(new Date(start_datetime),new Date(end_datetime))
        let tempTasks = tasks.map(x => {
            const timeFromStart =  getSecondsBetweenDates(new Date(start_datetime), new Date(x.start))
            x['width'] = x.duration * singleSecondWidth
            x['startPix'] = timeFromStart * singleSecondWidth
            return x
        })
        setTasks(tempTasks)
    }, [windowWidth])


    return (
        <div className={'flex flex-col border border-gray-100 bg-white overflow-y-auto scroll-style'}
             ref={scrollH}
             //style={{width: windowWidth - 95}}
            //style={{width: '100%'}}
        >
            <div className={'flex app-widow'} >
                {secondsPoint.map((item, index) => (
                    <div key={'df_' + index}

                         className={'w-28 px-2 py-1 flex-1'}
                         style={{background: '#f9f9f9', minWidth: minWidth}}>
                        {item}
                    </div>
                ))}
            </div>
            <div className={'flex flex-col items-start py-2'}>
                {tasks && tasks.map((item, index) => (
                    <div key={'dfa_' + index} className={'cursor-pointer my-0.5'} style={{position: "relative",left: item.startPix,width: item.width,background: item.styles.progressColor}}>
                        <Popover
                            placement="top" title={item.name} content={<p>{item.name}</p>} trigger="hover">

                                <div
                                    className={'text-center py-1 flex-1 text-xs'}
                                    style={{background: item.styles.progressColor}}>
                                    {item.name}
                                </div>

                        </Popover>
                    </div>


                ))}
            </div>
        </div>
    )
})

export default GanttTimeLineView