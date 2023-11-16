export default function NewNavbar() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "#212529",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px rgba(255, 255, 255, 0.10) solid",
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          left: 860,
          top: 13,
          position: "absolute",
          background: "white",
        }}
      ></div>
      <div
        style={{
          width: 35,
          height: 0,
          left: 851,
          top: 41,
          position: "absolute",
          transform: "rotate(-90deg)",
          transformOrigin: "0 0",
          border: "1px #AAAAAA solid",
        }}
      ></div>
      <div
        style={{
          width: 20,
          height: 20,
          left: 810,
          top: 15,
          position: "absolute",
          background: "rgba(0, 0, 0, 0)",
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            left: 0,
            top: 0,
            position: "absolute",
            background: "white",
          }}
        ></div>
      </div>
      <div
        style={{
          width: 35,
          height: 0,
          left: 790,
          top: 41,
          position: "absolute",
          transform: "rotate(-90deg)",
          transformOrigin: "0 0",
          border: "1px #AAAAAA solid",
        }}
      ></div>
      <div
        style={{
          width: 116,
          height: 20,
          left: 431,
          top: 13,
          position: "absolute",
          textAlign: "center",
          color: "#AAAAAA",
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Nuovo Annuncio
      </div>
      <div
        style={{
          width: 57,
          height: 20,
          left: 361,
          top: 13,
          position: "absolute",
          textAlign: "center",
          color: "#AAAAAA",
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        Home
      </div>
      <div
        style={{
          width: 335,
          height: 20,
          left: 13,
          top: 13,
          position: "absolute",
          textAlign: "center",
          color: "#17A1FA",
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        Il Tuo Software Per La Comunicazione Aziendale
      </div>
    </div>
  );
}
