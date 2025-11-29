import { Suspense } from "react";

import { getQueryClient, trpc, Hydrate } from "@/trpc/server";

import { Navbar } from "@/modules/home/ui/components/navbar";
import { Footer } from "@/modules/home/ui/components/footer";
import { SearchFilterSkeleton, SearchFilters } from "@/modules/home/ui/components/search-filters";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const queryClient = getQueryClient()
  void await queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions()
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hydrate>
        <Suspense fallback={<SearchFilterSkeleton />}>
          <SearchFilters />
        </Suspense>
      </Hydrate>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
