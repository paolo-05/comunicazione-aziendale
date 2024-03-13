import { type CategoryType } from "@/types/category";
import { type Session } from "next-auth";
import { Skeleton } from "../ui/skeleton";
import { Item } from ".";
import React from "react";

interface ListAllProps {
  session: Session | null;
  categories: CategoryType[] | null;
  setEditCategory: (category: CategoryType) => void;
}

export const ListAll = ({
  session,
  categories,
  setEditCategory,
}: ListAllProps): React.ReactElement => {
  return (
    <div className="grid gap-4">
      {categories != null ? (
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
