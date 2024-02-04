import { useState } from "react";

type ColorPickerProps = {
  change: (value: string) => void;
};

const colorOptions = [
  { name: "red", value: "bg-red-500 dark:bg-red-400 text-white" },
  { name: "orange", value: "bg-orange-500 dark:bg-orange-400 text-white" },
  { name: "yellow", value: "bg-yellow-500 dark:bg-yellow-400 text-white" },
  { name: "green", value: "bg-green-500 dark:bg-green-400 text-white" },
  { name: "cyan", value: "bg-cyan-500 dark:bg-cyan-400 text-white" },
  { name: "blue", value: "bg-blue-500 dark:bg-blue-400 text-white" },
  { name: "purple", value: "bg-purple-500 dark:bg-purple-400 text-white" },
  { name: "pink", value: "bg-pink-500 dark:bg-pink-400 text-white" },
];
type colorOption = {
  name: string;
  value: string;
};

export const ColorPicker = ({ change }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    colorOptions[0].value
  );
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const selectColor = (color: colorOption) => {
    setSelectedColor(color.value);
    change(color.name);
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Colore (richiesto)
      </span>
      <div className="bg-white dark:bg-gray-900 w-10 h-10 rounded-md flex flex-col items-center justify-center">
        <div
          id="selectedColor"
          className={`w-8 h-8 rounded-sm shadow ${selectedColor}`}
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        ></div>
      </div>
      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
          <div className="p-2">
            {colorOptions.map((option) => (
              <div
                key={option.value}
                className="color-option cursor-pointer"
                onClick={() => selectColor(option)}
              >
                <div
                  className={`w-6 h-6 rounded-sm shadow ${option.value} m-2 border hover:border-black`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
