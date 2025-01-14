import React from 'react';
import Header from '@/components/header';
import Folders from '@/pages/images/folders';
import { ImagesGalleryTable } from '@/pages/images/gallery';
import { Outlet, useLocation } from 'react-router-dom';
import { data } from '@/data';

const Images = () => {
  const images = data.navMain[0];
  const location = useLocation();

  return (
    <React.Fragment>
      <Header />
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        {location.pathname === '/images' && (
          <React.Fragment>
            <Folders items={images.items} />
            <ImagesGalleryTable />
          </React.Fragment>
        )}
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default Images;
