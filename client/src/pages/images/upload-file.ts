import axios from 'axios';

export const fetcher = (url: string, data: FormData) =>
  axios.post(url, data).then((res) => res.data);

const baseUrl = import.meta.env.VITE_API_URL as string;

export const getApiUrl = (pathname: string): string => {
  const pathsToEndpoints: Record<string, string> = {
    '/images/favorites': `${baseUrl}/api/images/favorites`,
    '/images/screenshots': `${baseUrl}/api/images/screenshots`,
  };

  return pathsToEndpoints[pathname] || `${baseUrl}/api/images`;
};
