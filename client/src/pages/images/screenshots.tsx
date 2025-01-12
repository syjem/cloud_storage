import axios from 'axios';
import useSWR from 'swr';
import LoaderSkeleton from './loading-state';
import { useViewStore } from '@/stores/images-view';
import { Gallery, Table } from '@/pages/images/gallery';
import { FileUploader } from '@/pages/images/uploader';
import { Outlet, useLocation } from 'react-router-dom';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const baseUrl = import.meta.env.VITE_API_URL as string;
const url = `${baseUrl}/api/images/screen_shots`;

const Screenshots = () => {
  const location = useLocation();
  const view = useViewStore((state) => state.view);
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });

  if (isLoading) return <LoaderSkeleton />;
  if (error) return <p>Error fetching images.</p>;
  if (!data || !data.images || data.images.length === 0)
    return <FileUploader />;

  return location.pathname === '/images/screenshots' ? (
    view === 'list' ? (
      <Table images={data.images} totalSize={data.total_size} />
    ) : (
      <Gallery images={data.images} />
    )
  ) : (
    <Outlet />
  );
};

export default Screenshots;
