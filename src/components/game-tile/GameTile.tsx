import { MouseEvent, useCallback } from "react";
import { Button } from "../ui/button";

export type GameTileProps = {
  isMine?: boolean;
  mineRank?: number;
  opened?: boolean;
  flagged?: boolean;
  onClick?: () => void;
  onRightClick?: () => void;
};

function Mine() {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      fill="red"
      stroke="red"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <defs></defs>
        <path
          className="a"
          d="M15.24,22.65a2.2,2.2,0,1,1,2.19-2.19A2.19,2.19,0,0,1,15.24,22.65ZM21,18.89a3,3,0,1,1,3-3A3,3,0,0,1,21,18.89Z"
        ></path>
        <circle className="b" cx="24.01" cy="24" r="15.73"></circle>
        <line className="b" x1="24" y1="2.5" x2="24" y2="8.27"></line>
        <line className="b" x1="45.51" y1="23.98" x2="39.75" y2="23.98"></line>
        <line className="b" x1="24.03" y1="45.5" x2="24.03" y2="39.73"></line>
        <line className="b" x1="2.51" y1="24.02" x2="8.28" y2="24.02"></line>
        <line className="b" x1="35.14" y1="12.88" x2="37.18" y2="10.84"></line>
        <line className="b" x1="35.14" y1="35.12" x2="37.18" y2="37.16"></line>
        <line className="b" x1="12.89" y1="35.12" x2="10.85" y2="37.16"></line>
        <line className="b" x1="12.89" y1="12.88" x2="10.85" y2="10.84"></line>
      </g>
    </svg>
  );
}

function Flag() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#ff0000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5 1C4.44772 1 4 1.44772 4 2V22C4 22.5523 4.44772 23 5 23C5.55228 23 6 22.5523 6 22V15.693L18.8542 10.8727C20.5846 10.2238 20.5846 7.77627 18.8542 7.12739L6 2.30705V2C6 1.44772 5.55228 1 5 1ZM6 4.44305V13.557L17.6526 9.18732C17.8256 9.12243 17.8256 8.87767 17.6526 8.81278L6 4.44305Z"
          fill="#ff0000"
        ></path>{" "}
      </g>
    </svg>
  );
}

export default function GameTile({
  isMine,
  mineRank,
  opened,
  onClick,
  onRightClick,
  flagged,
}: GameTileProps) {
  const handleRightClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (onRightClick) {
        onRightClick();
      }
    },
    [onRightClick]
  );
  return (
    <Button
      variant={opened ? "default" : "secondary"}
      className={`w-7 h-7 p-0`}
      onClick={onClick}
      onContextMenu={handleRightClick}
    >
      {opened ? isMine ? <Mine /> : mineRank : flagged ? <Flag /> : ""}
    </Button>
  );
}
