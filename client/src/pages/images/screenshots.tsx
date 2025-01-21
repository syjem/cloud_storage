import SkeletonLists from '@/pages/images/loaders/lists';
import { useViewStore } from '@/stores/images-view';
import { Gallery, Table } from '@/pages/images/gallery';
import { Outlet, useLocation } from 'react-router-dom';
import SkeletonGallery from './loaders/gallery';
import { useScreenShots } from '@/hooks/use-mutate';

const baseUrl = import.meta.env.VITE_API_URL as string;
const url = `${baseUrl}/api/images/screenshots`;

const Screenshots = () => {
  const location = useLocation();
  const view = useViewStore((state) => state.view);
  const { data, error, isLoading } = useScreenShots(url);

  if (isLoading)
    return view === 'list' ? <SkeletonLists /> : <SkeletonGallery />;
  if (error) return <p>Error fetching images.</p>;
  if (!data || !data.images || data.images.length === 0)
    return <p>No images found.</p>;

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
