import { useCallback, useState } from "react";

export type SingleTile = {
  opened: boolean;
  isMine: boolean;
  mineRank: number;
  flagged?: boolean;
};
export default function useCreateMinesweeper(numberOfRows: number) {
  const [gameState, setGameState] = useState<SingleTile[][]>([]);
  const [gameEnd, setGameEnd] = useState<"PASSED" | "FAILED" | "IN-GAME">(
    "PASSED"
  );
  const validCoordinate = useCallback((x: number, y: number) => {
    if (x < 0 || y < 0) {
      return false;
    }
    if (x > numberOfRows - 1 || y > numberOfRows - 1) {
      return false;
    }
    return true;
  }, []);
  const initializeGame = useCallback(() => {
    const newGameState: SingleTile[][] = [];
    // Randomly assign mines
    for (let i = 0; i < numberOfRows; i++) {
      const gameRow: SingleTile[] = [];
      for (let j = 0; j < numberOfRows; j++) {
        gameRow.push({
          opened: false,
          isMine: Math.random() < 0.1 ? true : false,
          mineRank: 0,
        });
      }
      newGameState.push(gameRow);
    }
    // Set mine rank according to assigned mines
    for (let i = 0; i < numberOfRows; i++) {
      for (let j = 0; j < numberOfRows; j++) {
        let mineRank = 0;
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) {
              continue;
            }
            if (validCoordinate(i + x, j + y)) {
              if (newGameState[i + x][j + y].isMine) {
                mineRank += 1;
              }
            }
          }
        }
        newGameState[i][j].mineRank = mineRank;
      }
    }
    setGameState(newGameState);
    setGameEnd("IN-GAME");
  }, [validCoordinate, numberOfRows]);

  const reveal = useCallback(
    (i: number, j: number, currentGameState: SingleTile[][]) => {
      let newGameState = structuredClone(currentGameState);
      if (newGameState[i][j].isMine) {
        newGameState[i][j].opened = true;
        return newGameState;
      }
      if (newGameState[i][j].mineRank > 0) {
        newGameState[i][j].opened = true;
        return newGameState;
      }
      newGameState[i][j].opened = true;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (
            validCoordinate(i + x, j + y) &&
            !newGameState[i + x][j + y].opened
          ) {
            newGameState = reveal(i + x, j + y, newGameState);
          }
        }
      }
      return newGameState;
    },
    [validCoordinate]
  );
  const checkGameGoal = useCallback(
    (gameState: SingleTile[][]): boolean => {
      for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfRows; j++) {
          if (!gameState[i][j].isMine && !gameState[i][j].opened) {
            console.log(i, j);
            return false;
          }
        }
      }
      return true;
    },
    [numberOfRows]
  );
  const handleGameStateUpdate = useCallback(
    (i: number, j: number) => {
      if (gameState[i][j].isMine) {
        console.log("FAILED");
        setGameEnd("FAILED");
      }
      const newGameState = reveal(i, j, gameState);
      setGameState(newGameState);
      if (checkGameGoal(newGameState)) {
        console.log("PASSED");
        setGameEnd("PASSED");
      }
    },
    [gameState, reveal, checkGameGoal]
  );
  const flagTile = useCallback(
    (i: number, j: number) => {
      const newGameState = structuredClone(gameState);
      newGameState[i][j].flagged = true;
      setGameState(newGameState);
    },
    [gameState]
  );
  return {
    gameState,
    initializeGame,
    reveal,
    handleGameStateUpdate,
    gameEnd,
    flagTile,
  };
}
