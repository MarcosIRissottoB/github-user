import React from 'react';
import styles from './Card.module.css';
import Image from 'next/image';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> & {
  Image: React.FC<CardImageProps>;
  Title: React.FC<CardTitleProps>;
  Info: React.FC<CardInfoProps>;
  Actions: React.FC<CardActionsProps>;
} = ({ children, className }) => {
  return <div className={`${styles.card} ${className || ''}`}>{children}</div>;
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

Card.Image = ({ src, alt, className }: CardImageProps) => (
  <Image
    src={src}
    alt={alt}
    className={`${styles.card__image} ${className || ''}`}
    width={200}
    height={200}
  />
);
Card.Image.displayName = 'Card.Image';

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

Card.Title = ({ children, className }: CardTitleProps) => (
  <h1 className={`${styles.card__title} ${className || ''}`}>{children}</h1>
);
Card.Title.displayName = 'Card.Title';

interface CardInfoProps {
  children: React.ReactNode;
  className?: string;
}

Card.Info = ({ children, className }: CardInfoProps) => (
  <p className={`${styles.card__info} ${className || ''}`}>{children}</p>
);
Card.Info.displayName = 'Card.Info';

interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
}

Card.Actions = ({ children, className }: CardActionsProps) => (
  <div className={`${styles.card__actions} ${className || ''}`}>{children}</div>
);
Card.Actions.displayName = 'Card.Actions';

export default Card;
