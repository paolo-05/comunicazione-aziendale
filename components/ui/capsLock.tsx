import { useEffect, useState } from "react";

export default function CapsLock() {
  const [capsLockOn, setCapsLockOn] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.getModifierState) {
        const capsLockIsOn = event.getModifierState("CapsLock");
        setCapsLockOn(capsLockIsOn);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  return <div>{capsLockOn ? "Caps Lock è attivo." : ""}</div>;
}
