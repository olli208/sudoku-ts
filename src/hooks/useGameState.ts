import { useFetchGame } from './useFetchGame'
import { useEffect, useState } from "react";

const deepCopy2D = (arr: number[][]): number[][] => arr.map((row) => [...row]);

interface useGameStateInterface {
  currentGameState: number[][];
  originalGrid: number[][];
  handleGameStateChange: (
      value: number,
    coord: Record<string, number>
  ) => void;
  initialLoading: boolean;
  fetchNewGame: () => void;
}

export const useGameState = (): useGameStateInterface => {
  const { data: grid, loading, fetchGame } = useFetchGame();
  const [originalGrid, setOriginalGrid] = useState<number[][]>([]);
  const [currentGameState, setCurrentGameState] = useState<number[][]>(grid);

  useEffect(() => {
    if (grid && grid.length > 0) {
      const gridCopy = deepCopy2D(grid);
      setOriginalGrid(gridCopy);
      setCurrentGameState(deepCopy2D(gridCopy));
    }
  }, [grid]);

  const handleGameStateChange = (
    value: number,
    coord: Record<string, number>
  ): void => {
    const { rowIndex, colIndex } = coord;

    setCurrentGameState((prevState) => {
      const newState = deepCopy2D(prevState);
      newState[rowIndex][colIndex] = value;

      if (isNaN(value) || value === 0) {
        newState[rowIndex][colIndex] = 0;

        return newState;
      }

      newState[rowIndex][colIndex] = value;

      return newState;
    });
  };

  return {
    currentGameState,
    originalGrid,
    handleGameStateChange,
    initialLoading: loading,
    fetchNewGame: fetchGame,
  };
};