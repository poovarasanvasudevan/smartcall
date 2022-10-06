import {MdNotes} from "react-icons/all.js";


const AppButton = ({ title, onClick, className,icon, ...rest}) => {
    return(
        <button className={`flex px-2 py-1 h-6 items-center text-white ${className}`}
                {...rest}
                onClick={onClick}>
            { icon && icon}
            <span className={'mt-0.5'}>&nbsp; &nbsp;{title}</span>
        </button>
    )
}
export default AppButton