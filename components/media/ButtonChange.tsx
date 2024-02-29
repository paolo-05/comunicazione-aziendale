import { FC } from "react";

type Props = {
  onClick: () => void;
};

export const ButtonChange: FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <button
      type="button"
      className="normal-case bg-blue-500 text-gray-50 font-medium py-2.5 px-4 rounded-lg shadow-xl shadow-blue-500/50"
      onClick={onClick}
      title="Cambia immagine"
    >
      Cambia immmagine
    </button>
  );
};
