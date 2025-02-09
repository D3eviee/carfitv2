export default function FormHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return(
        <div className="flex flex-col justify-center items-center mb-[30px]">
            <h1 className="text-[#111111] text-lg font-semibold">{title}</h1>
            <p className="text-[#333333] text-sm font-light">{subtitle}</p>
        </div>
    )
}
