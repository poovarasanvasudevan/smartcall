import {FiPhoneCall, IoClose} from "react-icons/all";
import {DialerButton} from "./DialerButton.jsx";
import Draggable from "react-draggable";
import {dialpadState} from "../core/GlobalState.js";
import {useAtom} from "jotai";


const DialerPanel = () => {

    const [dialPad, setDialPad] = useAtom(dialpadState)

    const dialButtons = [
        {label: '1', value: '1'},
        {label: '2', value: '2', letters: 'ABC'},
        {label: '3', value: '3', letters: 'DEF'},
        {label: '4', value: '4', letters: 'GHI'},
        {label: '5', value: '5', letters: 'JKL'},
        {label: '6', value: '6', letters: 'MNO'},
        {label: '7', value: '7', letters: 'PQRS'},
        {label: '8', value: '8', letters: 'TUV'},
        {label: '9', value: '9', letters: 'WXYZ'},
        {label: '*', value: '*'},
        {label: '0', value: '0'},
        {label: '#', value: '#'},
    ]

    return (
        <>
            {dialPad && (
                <Draggable bounds="parent">
                    <div className={'dialer-panel'}>
                        <div className={'call-header-panel'} style={{cursor: 'grab'}}>
                            <FiPhoneCall size={15} color={'#fff'}/>
                            <div className={'flex-1 ml-2 font-semibold'} style={{textAlign: 'start'}}>
                                Call
                            </div>

                            <IoClose size={15} color={'#fff'} className={'cursor-pointer'}
                                     onClick={() => setDialPad(!dialPad)}/>
                        </div>
                        <div className={'call-body-panel flex-1 p-3 flex flex-col justify-center items-center'}>
                            <div style={{background: '#f3f3f3'}} className={'flex p-2 h-9 flex-col w-full'}>
                            </div>
                            <div className={'flex-1'}>
                                <div className={'dialer-layout'}>
                                    {dialButtons.map((item, index) => (
                                        <DialerButton
                                            number={item.label}
                                            onClick={() => {
                                            }}
                                            controlNumber={item.value}
                                            label={item.letters}
                                            key={'controls_' + index}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className={'w-full px-1'}>
                                <button
                                    className={'bg-green-600 py-1 flex rounded justify-center items-center text-white w-full'}>
                                    <FiPhoneCall/>
                                    <div className={'ml-2'}>Call</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </Draggable>
            )}
        </>
    )
}

export default DialerPanel