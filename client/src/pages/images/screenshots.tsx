import axios from 'axios';
import useSWR from 'swr';
import LoaderSkeleton from './loading-state';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const baseUrl = import.meta.env.VITE_API_URL as string;
const url = `${baseUrl}/api/images/screen_shots`;

const Screenshots = () => {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  if (isLoading) return <LoaderSkeleton />;
  if (error) return <p>Error fetching images.</p>;
  if (!data || !data.data || data.data.length === 0)
    return <p>No images found.</p>;

  return (
    <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      <div className="flex gap-4">
        {data.data.map((imageUrl: string, index: number) => (
          <div key={index} className="">
            <img
              className="rounded-md aspect-square block max-w-full w-44"
              src={imageUrl}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screenshots;
