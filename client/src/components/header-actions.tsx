import { Check, Images, List, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useViewStore } from '@/stores/images-view';
import { FileUploader } from '@/pages/images/uploader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const HeaderActions = ({ pathname }: { pathname: string }) => {
  const paths = pathname.split('/').filter(Boolean);

  return (
    <div className="flex items-center gap-2 ml-auto mr-4">
      {paths.includes('images') && <DropDownViews />}
      <UploadDialog />
    </div>
  );
};

export function DropDownViews() {
  const { view, setView } = useViewStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-xs font-normal text-foreground dark:hover:bg-header-action [&_svg]:size-3">
          {view === 'list' ? (
            <List className="text-muted-foreground" />
          ) : (
            <Images className="text-muted-foreground" />
          )}
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={() => setView('list')}>
          <Check
            className={cn(
              'text-primary invisible',
              view === 'list' && 'visible'
            )}
          />
          List
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setView('gallery')}>
          <Check
            className={cn(
              'text-primary invisible',
              view === 'gallery' && 'visible'
            )}
          />
          Gallery
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UploadDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const addQueryParam = () => {
    const params = new URLSearchParams(location.search);
    params.set('upload', 'true');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const removeQueryParam = () => {
    const params = new URLSearchParams(location.search);
    params.delete('upload');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) addQueryParam();
    else removeQueryParam();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'text-xs font-normal text-foreground dark:hover:bg-header-action [&_svg]:size-3'
          )}>
          <Upload className="text-muted-foreground" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click to browse.
          </DialogDescription>
        </DialogHeader>
        <FileUploader
          onCloseDialog={() => {
            setIsOpen(!isOpen);
            removeQueryParam();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
