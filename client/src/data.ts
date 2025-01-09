import {
  MailCheck,
  FolderInput,
  Link2,
  ImageUp,
  Wallpaper,
  Star,
} from 'lucide-react';

export const data = {
  navMain: [
    {
      title: 'Images',
      url: '/images',
      icon: ImageUp,
      isActive: true,
      items: [
        {
          title: 'Favorites',
          url: '/images/favorites',
          icon: Star,
        },
        {
          title: 'Screenshots',
          url: '/images/screenshots',
          icon: Wallpaper,
        },
      ],
    },
    {
      title: 'Files',
      url: '/files',
      icon: FolderInput,
      items: [
        {
          title: 'Work',
          url: '/files/work',
        },
        {
          title: 'Private',
          url: '/files/private',
        },
      ],
    },
    {
      title: 'Emails',
      url: '/emails',
      icon: MailCheck,
      items: [
        {
          title: 'Inbox',
          url: '/emails/inbox',
        },
        {
          title: 'Trash',
          url: '/emails/trash',
        },
      ],
    },
    {
      title: 'Links',
      url: '/links',
      icon: Link2,
      items: [
        {
          title: 'Visited',
          url: '/links/visited',
        },
      ],
    },
  ],
};
