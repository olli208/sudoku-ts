import { useGameState } from "../../hooks/useGameState";

export const Grid = ({ gridSize }: { gridSize: number }) => {
  const {
    currentGameState,
    handleGameStateChange,
    fetchNewGame,
    initialLoading: loading,
    originalGrid,
  } = useGameState();

  const zeroStateGrid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => 0)
  );

  const displayGrid =
    currentGameState?.length > 0 ? currentGameState : zeroStateGrid;

  const isCellOriginal = (row: number, col: number): boolean =>
    originalGrid?.[row]?.[col] !== 0;

  return (
    <>
      {!loading && <button onClick={fetchNewGame}>get new game</button>}

      {loading ?? "getting new game..."}

      <table className="grid">
        <tbody>
          {displayGrid.map((row, rowIndex) => (
            <tr key={rowIndex} id={`row-${rowIndex}`} className="row">
              {row?.map((cell, colIndex) => (
                <td key={colIndex} className="cell" id={`col-${colIndex}`}>
                  <input
                    type="number"
                    onChange={(event) => {
                      handleGameStateChange(event.target.valueAsNumber, {
                        rowIndex,
                        colIndex,
                      });
                    }}
                    max={9}
                    min={1}
                    value={cell || ""}
                    disabled={isCellOriginal(rowIndex, colIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .grid {
          width: 100%;
          max-height: 90vh;
          overflow: auto;
          border: 3px solid white;
          margin: 1em;
          padding: 0;
          border-collapse: collapse;
        }

        .grid tr:nth-child(3n) td {
          border-bottom: 2px solid #ccc;
        }

        .grid td:nth-child(3n) {
          border-right: 2px solid #ccc;
        }

        .grid td input {
          height: 100%;
          width: 100%;
          border: 0;
          margin: 0;
          padding: 0;
          text-align: center;
          font-size: 1.5rem;
        }

        .cell {
          width: 55px;
          height: 55px;
          border: .5px solid #ccc;
          text-align: center;
          font-size: 1.5rem;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};
