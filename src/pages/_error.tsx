import React from 'react';
import { NextPageContext } from 'next';
import CustomError from '@/components/Error';

const ErrorPage = ({ statusCode }: { statusCode?: number }) => {
  return (
    <CustomError
      title="Oops, algo salió mal"
      message={`Ocurrió un error ${statusCode || 'desconocido.'}`}
      onRetry={() => window.location.reload()}
      retryLabel="Intentar de nuevo"
    />
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
