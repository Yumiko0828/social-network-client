import useSWR from "swr";
import { api } from "../providers/axios";

interface UserRes {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

function useProfile() {
  const { data, error, isLoading } = useSWR<UserRes, string>(
    "/users/profile",
    (url: string) => api.get(url).then(({ data }) => data),
  );

  return {
    data,
    error,
    isLoading,
  };
}

export default useProfile;
