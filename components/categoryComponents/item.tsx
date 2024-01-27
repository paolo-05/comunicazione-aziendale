type ItemProps = {
  id: number;
  title: string;
  description: string;
  colour: string;
};

export const Item = ({ id, title, description, colour }: ItemProps) => {
  return (
    <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <a href="#">{title}</a>
        </h3>

        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};
