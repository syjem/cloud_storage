import SkeletonLists from "@/pages/images/loaders/lists";
import {
  Download,
  MoreHorizontal,
  SquarePenIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useViewStore } from "@/stores/images-view";
import SkeletonGallery from "./loaders/gallery";
import { useImages } from "@/hooks/use-mutate";
import axios from "axios";
import { saveAs } from "file-saver";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_API_URL as string;
const url = `${baseUrl}/api/images`;

export const ImagesGalleryTable = () => {
  const { data, error, isLoading } = useImages(url);
  const view = useViewStore((state) => state.view);

  if (isLoading)
    return view === "list" ? <SkeletonLists /> : <SkeletonGallery />;
  if (error) return <p>Error fetching images.</p>;
  if (!data || !data.images || data.images.length === 0)
    return <p>No images found.</p>;

  return view === "list" ? (
    <Table images={data.images} totalSize={data.total_size} />
  ) : (
    <Gallery images={data.images} />
  );
};

const columns = ["Name", "Size", "Type", "Created at", "Last Modified at"];

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
            title={image.name}
            className="group grid grid-cols-5 cursor-pointer hover:bg-muted/75 px-4"
          >
            <span className="flex items-center gap-2 text-sm text-muted-foreground py-4 w-[95%] truncate">
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
              <TableDropDownMenu name={image.name} />
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

const TableDropDownMenu = ({ name }: { name: string }) => {
  const location = useLocation();
  const pathname = location.pathname.slice(1);

  const downloadFile = async (url: string, filePath: string) => {
    try {
      const response = await axios.post(
        url,
        { path: filePath },
        { responseType: "blob" }
      );

      const contentDisposition = response.headers["content-disposition"];
      const fileName =
        contentDisposition?.match(/filename="(.+)"/)?.[1] || name;

      saveAs(response.data, fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file. Please try again.");
    }
  };

  const downloadHandler = async () => {
    const url = `${baseUrl}/api/images/download`;
    const filePath = `${pathname}/${name}`;
    console.log(url);
    console.log(filePath);
    await downloadFile(url, filePath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="data-[state=open]:visible invisible group-hover:visible"
      >
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:bg-inherit"
        >
          <span className="sr-only">Open actions</span>
          <MoreHorizontal className="h-4 w-4 rotate-90 " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <SquarePenIcon className="text-muted-foreground" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem title={`Download ${name}`} onClick={downloadHandler}>
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
