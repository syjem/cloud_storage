import axios from 'axios';
import useSWR from 'swr';
import LoaderSkeleton from '@/pages/images/loading-state';
import { FileUploader } from '@/pages/images/uploader';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const baseUrl = import.meta.env.VITE_API_URL as string;
const url = `${baseUrl}/api/images/favorites`;

const Favorites = () => {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  if (isLoading) return <LoaderSkeleton />;
  if (error) return <p>Error fetching images.</p>;
  if (!data || !data.images || data.images.length === 0)
    return <FileUploader />;

  return <div>Favorite Images</div>;
};

export default Favorites;
