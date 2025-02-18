export const NextStepButton = ({ onClick = () => {} }) => {
    return (
        <button className="w-full flex bg-[#111111] py-2 justify-center items-center rounded-[7px] font-medium text-sm mt-[20px]" onClick={onClick}>
            Continue
        </button>
    )
}