import { ModeToggle } from '@/components/mode-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Links = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <React.Fragment>
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
        <ModeToggle />
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {location.pathname === '/links' && (
          <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </>
        )}

        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default Links;
