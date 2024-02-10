import { useParams } from "react-router-dom";
import useSWR from "swr";

function useGetPost() {
  const { id } = useParams();
  const { data, isLoading, mutate } = useSWR(`/posts/${id}`);

  return {
    data,
    isLoading,
    mutate,
  };
}

export default useGetPost;
