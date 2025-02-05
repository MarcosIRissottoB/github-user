import React from 'react';
import styles from './Error.module.css';

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const Error: React.FC<ErrorProps> = ({
  title = 'Oops, ocurrió un error',
  message = 'Por favor, verifica los datos o inténtalo más tarde.',
  onRetry,
  retryLabel = 'Volver',
}) => {
  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>{title}</h2>
      <p className={styles.error__message}>{message}</p>
      {onRetry && (
        <button className={styles.error__button} onClick={onRetry}>
          {retryLabel}
        </button>
      )}
    </div>
  );
};

export default Error;
