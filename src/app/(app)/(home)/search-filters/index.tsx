import { SearchInput } from "./search-input";
import { Categories } from "./categories";
import { customCategory } from "../types";

interface Props {
  categories: customCategory[];
}

export const SearchFilters = ({ categories }: Props) => {
  return (
    <div className="px-4 lg-px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput categories={categories} />
      <div className="hidden lg:block">
        <Categories categories={categories} />
      </div>
    </div>
  );
};
