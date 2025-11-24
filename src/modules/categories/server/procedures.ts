import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

type FormatedCategory = Omit<Category, 'subcategories'> & {
  subcategories: Category[]
}

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }): Promise<FormatedCategory[]> => {

    const categories = await ctx.payload.find({
      collection: "categories",
      depth: 1,
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    const formattedData = categories.docs.map((doc) => {
      return {
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
          // because of "depth 1" we are confindet that doc will always be type category, if it wasn´t, the whole subcategories data would break
          ...(doc as Category),
          subcategories: undefined,
        })),
      };
    });

    // try {
    //   return formattedData;
    // } catch (error) {
    //   console.error(error);
    // }

    return formattedData
  }),
});
