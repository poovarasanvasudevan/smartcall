
export const DialerButton = ({ number, onClick,className,controlNumber,label = null,hw="w-10 h-10" }) => {
    return (
        <div
            className={`${hw} dialer-btn items-center justify-center flex flex-col cursor-pointer ${className}`}
            onClick={() => onClick(controlNumber)}
        >
            <div className="font-semibold text-black">{number}</div>
            { label && <div style={{fontSize: '7px'}}>{label}</div> }
        </div>
    );
}
