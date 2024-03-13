import React, { useState } from "react";

interface ColorPickerProps {
  initialColor?: string | null;
  change: (value: string) => void;
}

const colorClasses = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "purple",
  "pink",
];

export const ColorPicker = ({
  change,
  initialColor,
}: ColorPickerProps): React.ReactElement => {
  const [selectedColor, setSelectedColor] = useState<string>(
    initialColor ?? "red",
  );
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const selectColor = (color: string): void => {
    setSelectedColor(color);
    change(color);
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
          className={`w-8 h-8 rounded-sm shadow bg-${selectedColor}-500 dark:bg-${selectedColor}-400 text-white`}
          onClick={() => {
            setDropdownOpen(!isDropdownOpen);
          }}
        ></div>
      </div>
      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
          <div className="p-2">
            {colorClasses.map((option) => (
              <div
                key={option}
                className="color-option cursor-pointer"
                onClick={() => {
                  selectColor(option);
                }}
              >
                <div
                  className={`w-6 h-6 rounded-sm shadow bg-${option}-500 dark:bg-${option}-400 text-white m-2 border hover:border-black`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
