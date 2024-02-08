import { CategoryType } from "@/types/categoryTypes";
import { Session } from "next-auth";

type ItemProps = {
  session: Session | null;
  category: CategoryType;
  setEditCategory: (category: CategoryType) => void;
};

export const Item = ({ category, session, setEditCategory }: ItemProps) => {
  const customClass = `bg-${category.colour}-300 dark:bg-${category.colour}-800 p-4 rounded-md shadow-sm`;

  return (
    <div className={customClass}>
      <div className="flex items-start justify-between">
        <span className="text-lg font-medium text-gray-900 dark:text-white">
          {category.name}
        </span>
        <div className="flex gap-2">
          {/* to do */}
          <button
            onClick={() => setEditCategory(category)}
            type="button"
            className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          >
            Modifica
          </button>
          {/* to do */}
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Elimina
          </button>
        </div>
      </div>
      <p className="mt-2 text-gray-800 dark:text-gray-100">{category.colour}</p>
    </div>
  );
};
