import { AddCategoryButton } from "@/components/dashboard/services/add-category-button";
import ServicesCategorySidebarItem from "./services-categories-sidebar-item";

export default function ServicesCategorySidebar({categories}: {categories: CategoriesData[]}) {
  return (
    <div className="bg-[#FFFFFF] w-[215px] max-h-fit flex flex-col gap-5  px-4 py-5 border-[0.5px] border-[#D4D4D4] rounded-lg ">
      <h3 className="text-base text-[#333] font-semibold  px-2.5">Kategorie</h3>
      <ul className="flex flex-col gap-2 min-h-7 list-none">
        {categories && categories?.length > 0 ? (
          categories.map((category, index) => {
            return (
              <ul className="flex flex-row w-full px-2.5 py-2.5 rounded-[5px] border-[0.5px] border-[#D4D4D4] items-center justify-between" key={index}>
                <ServicesCategorySidebarItem category={category}/>
              </ul>
            );
          })
        ) : (
          <li className="text-sm font-light text-[#555] text-center">
            No categories
          </li>
        )}
      </ul>
      <AddCategoryButton />
    </div>
  );
}