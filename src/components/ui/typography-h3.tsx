import { ReactNode } from 'react';

interface IProps {
    children: ReactNode
};

export const TypographyH3 = ({ children }: IProps) => {
  return (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
    >
      {children}
    </h3>
  );
};