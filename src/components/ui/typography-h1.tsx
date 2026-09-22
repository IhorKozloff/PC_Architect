import { ReactNode } from 'react';

interface IProps {
    children: ReactNode
};

export const TypographyH1 = ({ children }: IProps) => {
  return (
    <h1
      className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
    >
      {children}
    </h1>
  );
};