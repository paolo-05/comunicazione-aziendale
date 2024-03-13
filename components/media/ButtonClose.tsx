import React, { type FC } from "react";

interface Props {
  onClick: () => void;
}

export const ButtonClose: FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <button
      type="button"
      className="normal-case bg-blue-500 text-gray-50 font-medium py-2.5 px-4 rounded-lg shadow-xl shadow-blue-500/50"
      onClick={onClick}
      title="Immagine caricata con successo, puoi chiudere questa finestra."
    >
      Chiudi
    </button>
  );
};
