export const get_session = () => {
  const hasToken = document.cookie
    .split('; ')
    .some((cookie) => cookie.startsWith('sb_access_token='));
  console.log('Session Token Present:', hasToken);

  return hasToken;
};
