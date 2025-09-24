import { useEffect, useState } from "react";

interface useFetchGameInterface {
  data: [][];
  loading: boolean;
  fetchGame: () => void;
}

export const useFetchGame = (): useFetchGameInterface => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null!);

  const fetchGame = async () => {
    try {
      setLoading(true);
      const req = await fetch(`https://sudoku-api.vercel.app/api/dosuku`);
      const data = await req.json();

      if (data) {
        setData(data?.newboard?.grids[0].value);
        setLoading(false);
      } else {
        throw new Error("No data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGame();
  }, []);

  return { data, loading, fetchGame };
};
