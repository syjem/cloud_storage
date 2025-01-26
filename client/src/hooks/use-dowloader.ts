import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.post(url).then((res) => res.data);

export const useDownloader = (url: string)  => {
    const { data, error, isLoading } = useSWR(url, fetcher);

    return {
        data,
        error,
        isLoading,
    };
}