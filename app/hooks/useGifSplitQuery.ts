import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const fetchGifSplitById = async (id: string) => {
  const response = await fetch(`/api/gif-splits/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

interface UseGetGifSplitOptions
  extends Omit<UseQueryOptions<any, Error>, "queryKey"> {
  refetchInterval?: number | false;
  // more options here as needed
}

export function useGetGifSplit(
  gifSplitId: string,
  options?: UseGetGifSplitOptions
) {
  return useQuery({
    queryKey: ["gif-split", `${gifSplitId}`],
    queryFn: () => {
      return fetchGifSplitById(gifSplitId);
    },
    ...options,
  });
}
