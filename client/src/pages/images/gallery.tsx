import axios from 'axios';
import useSWR from 'swr';

const url = 'http://localhost:5000/api/images';
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const ImageGallery = () => {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  if (isLoading) return <p>Loading images...</p>;
  if (error) return <p>Error fetching images.</p>;
  if (!data || !data.data || data.data.length === 0)
    return <p>No images found.</p>;

  return (
    <div className="flex flex-col gap-4 flex-1">
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
