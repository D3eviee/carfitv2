import { useEffect, useState } from "react"

const useQuery = (url:string, refetch: number) => {
  const [state, setState] =  useState({
    data: null,
    isLoading: true,
    error: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setState({ data, isLoading: false, error: '' });
      } catch (error: any) {
        setState({
          data: null,
          isLoading: false,
          error: error?.message || 'Something went wrong',
        });
      }
    };

    fetchData();
  }, [url, refetch]);

  return state
}

export default useQuery