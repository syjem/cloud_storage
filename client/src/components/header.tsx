import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useLocation, Link } from 'react-router-dom';
import { RefreshCw, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-primary hover:text-primary/75" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {pathSegments.map((segment, index) => {
              const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
              const displayName =
                segment.charAt(0).toUpperCase() + segment.slice(1);

              if (index === 0) {
                return (
                  <BreadcrumbItem key={segment} className="hidden md:block">
                    <Link to={href}>{displayName}</Link>
                  </BreadcrumbItem>
                );
              }
              if (index === 1) {
                return (
                  <React.Fragment key={segment}>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{displayName}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              }
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2 ml-auto mr-4">
        <Button
          variant="ghost"
          className="text-sm font-normal text-foreground hover:bg-muted/65">
          <RefreshCw className="h-3 w-3 text-muted-foreground" />
          Refresh
        </Button>
        <Separator orientation="vertical" className="h-5" />
        <Button
          variant="ghost"
          className="text-sm font-normal text-foreground hover:bg-muted/65">
          <Upload className="h-3 w-3 text-muted-foreground" />
          Upload
        </Button>
      </div>
    </header>
  );
};

export default Header;
