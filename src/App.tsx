import { useEffect } from "react";
import { Button } from "./components/ui/button";
import useCreateMinesweeper from "./hooks/use-create-minesweeper";
import GameTile from "./components/game-tile/GameTile";
import LandmineGif from "@/assets/landmine.webp";

function App() {
  const {
    gameState,
    initializeGame,
    handleGameStateUpdate,
    gameEnd,
    flagTile,
  } = useCreateMinesweeper(10);
  useEffect(() => {
    initializeGame();
  }, []);
  return (
    <div className="dark bg-background h-full flex flex-col flex-1 items-center gap-20 justify-center">
      <img src={LandmineGif}></img>
      <div
        className={`grid grid-cols-10 gap-4 ${
          gameEnd === "FAILED"
            ? "border-2 p-2 border-red-500"
            : gameEnd === "PASSED"
            ? "border-2 p-2 border-green-500"
            : ""
        }`}
      >
        {gameState.map((eachRow, rowKey) =>
          eachRow.map((eachTile, tileKey) => (
            <GameTile
              key={`${rowKey}${tileKey}`}
              {...eachTile}
              onRightClick={() => flagTile(rowKey, tileKey)}
              onClick={
                gameEnd === "IN-GAME"
                  ? () => handleGameStateUpdate(rowKey, tileKey)
                  : undefined
              }
            />
          ))
        )}
      </div>
      <Button onClick={initializeGame}>
        {gameEnd === "IN-GAME" ? "Reset" : "Start"}
      </Button>
    </div>
  );
}

export default App;
