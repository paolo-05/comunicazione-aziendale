import type { FC } from "react";

type ProgressCardProps = {
  progressStatus: number;
};

export const ProgressCard: FC<ProgressCardProps> = ({ progressStatus }) => {
  const width = progressStatus.toString().concat("%");

  return (
    <div className="w-[402px] h-[144px] px-8 flex flex-col gap-8 justify-center items-center bg-white dark:bg-gray-900 rounded-xl shadow-lg shadow-gray-200/80 dark:shadow-gray-800/80">
      <h2 className="w-full capitalize text-xl text-left text-gray-600 dark:text-gray-300 font-semibold">
        Caricando...
      </h2>
      <div className="relative w-full h-2 bg-gray-50 dark:bg-gray-700 rounded">
        <div
          className="absolute inset-y-0 h-full bg-blue-500 transition-[width] rounded"
          style={{ width }}
        />
      </div>
    </div>
  );
};
