import { useEffect, useState } from 'react';

export default function useGithubPortfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPortfolio() {
      try {
        const endpoint = process.env.NODE_ENV === 'development'
          ? '/api/github-portfolio'
          : '/.netlify/functions/github-portfolio';
        const response = await fetch(endpoint, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error('GitHub portfolio endpoint unavailable');
        setData(await response.json());
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadPortfolio();
    return () => controller.abort();
  }, []);

  return { data, loading, error };
}
