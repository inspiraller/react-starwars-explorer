import { PropsWithChildren } from 'react';

export const FormError = ({ children }: PropsWithChildren) => {
  return (
    <section style={{ color: 'var(--text-color-error)', fontWeight: 'bold' }}>
      <h2>Error</h2>
      {children}
    </section>
  );
};
