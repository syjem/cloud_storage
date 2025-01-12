import { Check, List, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useViewStore } from '@/stores/images-view';
import { Link } from 'react-router-dom';

export const HeaderActions = ({ pathname }: { pathname: string }) => {
  const paths = pathname.split('/').filter(Boolean);

  const uploadLink =
    paths.includes('images') && paths.length > 1
      ? `/${paths.join('/')}/upload`
      : '/images/upload';

  return (
    <div className="flex items-center gap-2 ml-auto mr-4">
      {paths.includes('images') && <DropDownViews />}
      <Button
        variant="ghost"
        asChild
        className="text-xs font-normal text-foreground dark:hover:bg-header-action [&_svg]:size-3">
        <Link to={uploadLink}>
          <Upload className="text-muted-foreground" />
          Upload
        </Link>
      </Button>
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
          <List className="text-muted-foreground" />
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
