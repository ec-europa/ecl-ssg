import { useLocation } from '@reach/router';

const getLang = () => {
  const { pathname } = useLocation();
  return pathname.split('/')[1] && pathname.split('/')[1].length == 2 ? pathname.split('/')[1] : 'en';
}

export default getLang;