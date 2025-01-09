import React from 'react';
import { data } from '@/data';
import Header from '@/components/header';
import ImageLinks from '@/pages/images/image-links';
import { ImageGallery } from '@/pages/images/gallery';
import { Outlet, useLocation } from 'react-router-dom';

const Images = () => {
  const images = data.navMain[0];
  const location = useLocation();

  return (
    <React.Fragment>
      <Header />
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        {location.pathname === '/images' && (
          <React.Fragment>
            <ImageLinks items={images.items} />
            <ImageGallery />
          </React.Fragment>
        )}
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default Images;
