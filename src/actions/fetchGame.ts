export const fetchGame = async () => {
    try {
      const req = await fetch("https://sudoku-api.vercel.app/api/dosuku");
      const data = await req.json();

      if (data) {
        return data?.newboard?.grids[0].value
      } else {
        throw new Error("No data");
      }
    } catch (error) {
      console.error(error);
    }
  };