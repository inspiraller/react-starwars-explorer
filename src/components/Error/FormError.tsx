import { PropsWithChildren } from 'react';

export const FormError = ({ children }: PropsWithChildren) => {
  return (
    <section style={{ color: '#900', fontWeight: 'bold' }}>
      <h2>Error</h2>
      {children}
    </section>
  );
};
