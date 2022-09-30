import {BiTransfer} from "react-icons/all";
import {Input, Radio} from "antd";
import Draggable from "react-draggable";
import {IoClose} from "react-icons/all.js";
import {useAtom} from "jotai";
import {transferDialogAtom} from "../core/GlobalState.js";


const CallTransferDialog = () => {

    const [transferDialog, setTransferDialog] = useAtom(transferDialogAtom)

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
                                <Radio.Group className={'w-full flex'}>
                                    <Radio className={'flex-1'} value={1}>Agent</Radio>
                                    <Radio className={'flex-1'} value={2}>Queue</Radio>
                                </Radio.Group>
                            </div>
                            <div className={'py-1 px-4 w-full'}>
                                <Input placeholder={'Search'} size={'small'} className={'w-full h-7'}/>
                            </div>

                            <div className={'flex-1'}>

                            </div>
                        </div>

                    </div>
                </Draggable>
            )}
        </>
    )
}

export default CallTransferDialog