import { MailCheck, FolderInput, Link2, ImageUp } from 'lucide-react';

export const data = {
  navMain: [
    {
      title: 'Images',
      url: '#',
      icon: ImageUp,
      isActive: true,
      items: [
        {
          title: 'Personal',
          url: '#',
        },
        {
          title: 'Screen Shots',
          url: '#',
        },
        {
          title: 'Important',
          url: '#',
        },
      ],
    },
    {
      title: 'Files',
      url: '#',
      icon: FolderInput,
      items: [
        {
          title: 'Work',
          url: '#',
        },
        {
          title: 'Confidential',
          url: '#',
        },
      ],
    },
    {
      title: 'Emails',
      url: '#',
      icon: MailCheck,
      items: [
        {
          title: 'Inbox',
          url: '#',
        },
        {
          title: 'Trash',
          url: '#',
        },
      ],
    },
    {
      title: 'Links',
      url: '#',
      icon: Link2,
      items: [
        {
          title: 'Visited',
          url: '#',
        },
        {
          title: 'History',
          url: '#',
        },
      ],
    },
  ],
};
