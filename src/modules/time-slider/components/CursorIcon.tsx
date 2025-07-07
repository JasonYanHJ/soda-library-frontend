export default function CursorIcon({ fill }: { fill?: string }) {
  return (
    <span className="anticon">
      <svg
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4590"
        width="1em"
        height="1em"
        style={{ transform: "rotate(-45deg)" }}
      >
        <path
          d="M958.70539 62.365396 62.385351 367.92872l448.163089 140.925636 142.592602 449.830055L958.70539 62.365396zM958.70539 62.365396"
          fill={fill ?? "#000"}
          p-id="4591"
        ></path>
      </svg>
    </span>
  );
}
