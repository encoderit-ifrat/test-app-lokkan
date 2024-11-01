import { useRouter } from 'next/router';

const useParams = () => {
  const router = useRouter();

  const setParams = (params) => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, ...params },
    });
  };

  return { setParams };
};

export default useParams;
