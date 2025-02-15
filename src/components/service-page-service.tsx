export const ServicePageService = () => {
  return (
    <div className="w-full flex flex-row items-center justify-between gap-[116px] p-[20px] bg-[#F6F6F6] border-[0.5px] border-[#D4D4D4] rounded-[5px] hover:bg-[#E5E5E5] hover:cursor-pointer">
      <div className="flex flex-col">
        <h3 className="text-[15px] text-[#333333] font-medium">Wymiana Klocków Hamulcowych Przód</h3>
        <p className="text-[13px] text-[#555555] font-normal">1 godz. 30 min - 2 godz. 30min</p>
      </div>
      <div className="flex flex-row gap-[70px] items-center">
        <p className="text-[15px] text-[#000000] font-medium leading-[18px]">Od 250 zł</p>
        <div className="bg-[#F25287] border-[0.5px] border-[#CCCCCC] rounded-[7px] px-[12px] py-2 text-white">Umów</div>
      </div>
    </div>
  );
};
