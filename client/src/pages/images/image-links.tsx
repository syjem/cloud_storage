import { Link } from 'react-router-dom';
import { NavMainItem } from '@/components/nav-main';
import { cn } from '@/lib/utils';

const ImageLinks = ({ items }: { items: NavMainItem[] }) => {
  return (
    <div className="grid auto-rows-min gap-2.5 md:gap-4 md:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item.title}
          to={item.url}
          className={cn(
            'flex items-center justify-center gap-2 py-3 rounded-lg bg-muted hover:bg-muted/75'
          )}>
          {item.icon && <item.icon className="w-5 h-5" />}
          <span className="font-semibold">{item.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default ImageLinks;
