import React, { useEffect } from 'react';
import NProgress from 'nprogress';

const LoadingProgress = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return <></>;
};

export default LoadingProgress;
