import { useEffect, useState } from "react";
import "./App.css";

const GRID_SIZE = 9;

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [grid, setGrid] = useState<number[][]>(
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => 0)
    )
  );

  const handleCellClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log({ event });
  };

  const fetchGrid = async () => {
    try {
      setLoading(true);
      const req = await fetch("https://sudoku-api.vercel.app/api/dosuku");
      const data = await req.json();

      if (data) {
        setGrid(data?.newboard?.grids[0].value);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGrid()
  }, []);

  return (
    <>
      {!loading && <button onClick={fetchGrid}>get new game</button>}

      {loading ?? "getting new game..."}

      <table className="grid">
      {grid.map((row, rowIndex) => (
        <tr key={rowIndex} id={`row-${rowIndex}`} className={`row`}>
          {row.map((cell, colIndex) => (
            <td className="cell">
              <div
                key={colIndex}
                id={`col-${colIndex}`}
                onClick={handleCellClick}
              >
                {cell || <input type="number"/>}
              </div>
            </td>
          ))}
        </tr>
      ))}
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
}

export default App;
