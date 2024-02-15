import { CategoryType } from "@/types/categoryTypes";
import { Session } from "next-auth";
import { Skeleton } from "../ui/skeleton";
import { Item } from "./item";

type ListAllProps = {
  session: Session | null;
  categories: CategoryType[] | null;
  setEditCategory: (category: CategoryType) => void;
};

export const ListAll = ({
  session,
  categories,
  setEditCategory,
}: ListAllProps) => {
  return (
    <div className="grid gap-4">
      {categories ? (
        categories.map((category) => (
          <Item
            key={category.id}
            category={category}
            session={session}
            setEditCategory={setEditCategory}
          />
        ))
      ) : (
        <>
          <Skeleton />
        </>
      )}
    </div>
  );
};
