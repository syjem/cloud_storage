import axios from 'axios';
import useSWR from 'swr';
import LoaderSkeleton from './loading-state';
import {
  Download,
  MoreHorizontal,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useViewStore } from '@/stores/images-view';
import { FileUploader } from '@/pages/images/uploader';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const baseUrl = import.meta.env.VITE_API_URL as string;
const url = `${baseUrl}/api/images`;

export const ImagesGalleryTable = () => {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0,
  });
  const view = useViewStore((state) => state.view);

  if (isLoading) return <LoaderSkeleton />;
  if (error) return <p>Error fetching images.</p>;
  if (!data || !data.images || data.images.length === 0)
    return <FileUploader />;

  return view === 'list' ? (
    <Table images={data.images} totalSize={data.total_size} />
  ) : (
    <Gallery images={data.images} />
  );
};

const columns = ['Name', 'Size', 'Type', 'Created at', 'Last Modified at'];

type ImageType = {
  name: string;
  size: string;
  type: string;
  url: string;
  created_at: string;
  last_modified_at: string;
};

export const Table = ({
  images,
  totalSize,
}: {
  images: ImageType[];
  totalSize: string;
}) => {
  return (
    <section className="relative border rounded-t-md bg-background flex-1">
      {/* Table header */}
      <div className="grid grid-cols-5 p-4 border-b">
        {columns.map((column) => (
          <span key={column} className="text-sm font-medium text-foreground">
            {column}
          </span>
        ))}
      </div>
      {/* Table content */}
      <ul className="divide-y">
        {images.map((image: ImageType) => (
          <li
            key={image.name}
            className="group grid grid-cols-5 cursor-pointer hover:bg-muted/75 px-4">
            <span className="flex items-center gap-2 text-sm text-muted-foreground py-4">
              <img
                src={image.url}
                alt={image.name}
                width={20}
                height={20}
                className="max-w-full"
              />
              {image.name}
            </span>
            <span className="text-sm text-muted-foreground py-4">
              {image.size}
            </span>
            <span className="text-sm text-muted-foreground py-4">
              {image.type}
            </span>
            <span className="text-sm text-muted-foreground py-4">
              {image.created_at}
            </span>
            <div className="flex items-center justify-between pr-8">
              <span className="text-sm text-muted-foreground py-4">
                {image.last_modified_at}
              </span>
              <TableDropDownMenu />
            </div>
          </li>
        ))}
      </ul>
      {/* Table footer */}
      <div className="absolute bottom-0 bg-muted/75 px-4 py-1 w-full text-end">
        <span className="text-muted-foreground text-sm font-normal">
          {totalSize} for <strong>{images.length} items</strong>
        </span>
      </div>
    </section>
  );
};

const TableDropDownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="data-[state=open]:visible invisible group-hover:visible">
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:bg-inherit">
          <span className="sr-only">Open actions</span>
          <MoreHorizontal className="h-4 w-4 rotate-90 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <SquarePenIcon className="text-muted-foreground" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="text-muted-foreground" />
          Download
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash2Icon className="text-muted-foreground" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Gallery = ({ images }: { images: ImageType[] }) => {
  return (
    <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
      <div className="flex gap-4">
        {images.map((image: ImageType) => (
          <div key={image.name} className="">
            <img
              className="rounded-md aspect-square block max-w-full w-44"
              src={image.url}
              alt={image.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
