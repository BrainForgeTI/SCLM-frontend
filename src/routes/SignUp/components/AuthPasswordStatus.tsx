import CheckedIcon from '../../../assets/icons/checked.svg';

interface Props {
    label: string
    status: boolean
}

const AuthPasswordStatus = (props: Props) => {
    return (
        <div className="w-full flex gap-3">
            <div className={`w-[13px] h-[13px] flex justify-center rounded-[2px] items-center border ${props.status ? 'bg-[#00CA07]/21 border-[#00CA07]/6' : 'bg-base-content/21 border-base-content/21'}`}>
                {
                    props.status ? <CheckedIcon /> : ''
                }
            </div>
            <span className='text-[10px] text-base-content/66'>{props.label}</span>
        </div>
    )
}

export default AuthPasswordStatus;