import { Check, List, RefreshCw, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useViewStore } from '@/stores/images-view';

export const HeaderActions = ({ pathname }: { pathname: string }) => {
  return (
    <div className="flex items-center gap-2 ml-auto mr-4">
      <Button
        variant="ghost"
        className="text-xs font-normal text-foreground hover:bg-background [&_svg]:size-3">
        <RefreshCw className="text-muted-foreground" />
        Refresh
      </Button>
      {pathname === '/images' && <DropdownMenuCheckboxes />}
      <Separator orientation="vertical" className="h-5" />
      <Button
        variant="ghost"
        className="text-xs font-normal text-foreground hover:bg-background [&_svg]:size-3">
        <Upload className="text-muted-foreground" />
        Upload
      </Button>
    </div>
  );
};

export function DropdownMenuCheckboxes() {
  const { view, setView } = useViewStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-xs font-normal text-foreground hover:bg-background [&_svg]:size-3">
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
