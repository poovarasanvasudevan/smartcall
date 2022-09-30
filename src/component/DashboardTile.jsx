

const DashboardTile = ({icon,color,label,value}) => {
    return (
        <div className={'w-52 cursor-pointer p-2.5 bg-white flex border border-gray-100'}>
            <div className={'w-12 h-12 flex items-center justify-center'} style={{background: color}}>
                {icon}
            </div>

            <div className={'flex flex-col flex-1 pr-1 justify-center'} style={{alignItems:'end'}}>
                <div className={'font-semibold text-xl'} style={{lineHeight:1}}>{value}</div>
                <div className={'text-gray-500'}>{label}</div>
            </div>
        </div>
    )
}

export default DashboardTile