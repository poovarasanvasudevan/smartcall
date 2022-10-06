import {Spin} from "antd";

const FullScreenProgressBar = () => {
    return (
        <div className={'flex w-full h100 items-center justify-center'}>
            <Spin tip={'Loading...'} />
        </div>
    )
}

export default FullScreenProgressBar