import {BiTransfer} from "react-icons/all";
import {Avatar, Input, Radio} from "antd";
import Draggable from "react-draggable";
import {IoClose} from "react-icons/all.js";
import {useAtom} from "jotai";
import {transferDialogAtom} from "../core/GlobalState.js";
import {useEffect, useState} from "react";
import {agentList, queueList} from "../core/Api.js";
import {EventBus, extractInitials} from "../core/AppUtils.js";
import {debug} from "../core/Log.js";
import {TRANSFER_CALL} from "../core/Config.js";


const CallTransferDialog = () => {

    const [transferDialog, setTransferDialog] = useAtom(transferDialogAtom)
    const [currentData, setCurrentData] = useState([])
    const [searchString, setSearchString] = useState("")
    const [searchData, setSearchData] = useState("")

    useEffect(() => {

    }, [])

    const onChange = async (e) => {
        console.log('radio checked', e.target.value);
        setSearchString("")

        if (e.target.value === 1) {
            const agentData = await agentList()
            setCurrentData(agentData.map(x => ({displayName: x.extension_display_name, extension: x.extension})))
        } else {
            const queueData = await queueList()
            setCurrentData(queueData.map(x => ({displayName: x.Queue, extension: x.QueueId})))
        }
    };

    useEffect(() => {
        if (searchString.trim() === "") {
            setSearchData(currentData)
        } else {
            const filtered = currentData.filter(x => x.displayName.toLowerCase().includes(searchString.toLowerCase()) || x.extension.toLowerCase().includes(searchString.toLowerCase()))
            debug(filtered)
            setSearchData(filtered)
        }
    }, [searchString, currentData])

    const onSearch = (e) => {
        setSearchString(e.target.value)
    }

    const onTransfer = (extension) => {
        EventBus.$dispatch(TRANSFER_CALL, {extension: extension})
    }

    return (
        <>
            {transferDialog && (
            <Draggable bounds="parent">
                <div className={'transfer-panel'}>
                    <div className={'call-header-panel'} style={{cursor: 'grab'}}>
                        <BiTransfer size={15} color={'#fff'}/>
                        <div className={'flex-1 ml-2'} style={{textAlign: 'start'}}>
                            Transfer Call
                        </div>

                        <IoClose size={15} color={'#fff'} className={'cursor-pointer'}
                                 onClick={() => setTransferDialog(!transferDialog)}/>
                    </div>
                    <div className={'call-panel-body'}>
                        <div className={'flex py-2'}>
                            <Radio.Group className={'w-full flex'} onChange={onChange}>
                                <Radio className={'flex-1'} value={1}>Agent</Radio>
                                <Radio className={'flex-1'} value={2}>Queue</Radio>
                            </Radio.Group>
                        </div>
                        <div className={'px-2 w-full'}>
                            <Input value={searchString} placeholder={'Search'} size={'small'} className={'w-full h-7'}
                                   onChange={onSearch}/>
                        </div>

                        <div className={'flex-1 flex flex-col w-full  mt-1 px-2 overflow-y-auto'}>
                            {searchData && searchData.map(x => (
                                <div className={'flex py-1.5 px-2 cursor-pointer hover:bg-gray-100'} onClick={()=>onTransfer(x.extension)}>
                                    <Avatar style={{backgroundColor: "red"}} size={26}
                                            className={'bg-red-500'}>{extractInitials(x.displayName)}</Avatar>
                                    <div className={'flex flex-1 flex-col items-start justify-center pl-2'}>
                                        <div className={'font-medium'}
                                             style={{fontSize: 13, lineHeight: 1}}>{x.displayName}</div>
                                        <div style={{fontSize: 11, lineHeight: 1}}
                                             className={'pt-1'}>{x.extension}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </Draggable>
            )}
        </>
    )
}

export default CallTransferDialog