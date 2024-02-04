import { CategoryType } from "@/types/categoryTypes";

type ItemProps = {
  category: CategoryType;
};

export const Item = ({ category }: ItemProps) => {
  console.log(category.name + " " + category.colour);

  return (
    <div
      className={`bg-${category.colour}-300 dark:bg-${category.colour}-800 p-4 rounded-md shadow-sm`}
    >
      <div className="flex items-start justify-between">
        <span className="text-lg font-medium text-gray-900 dark:text-white">
          {category.name}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          >
            Modifica
          </button>
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Elimina
          </button>
        </div>
      </div>
      <p className="mt-2 text-gray-800 dark:text-gray-100">
        {category.description}
      </p>
    </div>
  );
};
