import { CategoryDropdown } from "./category-dropdown";

import { Category } from "@/payload-types";

interface Props {
  data: Category[];
}

export const Categories = ({ data }: Props) => {
  const categories = data;

  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {categories.map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
