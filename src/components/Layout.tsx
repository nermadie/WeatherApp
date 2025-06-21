import type { PropsWithChildren } from 'react';

import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => (
  <div className='from-background to-muted bg-gradient-to-br'>
    <Header />
    <main className='container mx-auto min-h-screen px-4 py-8'>{children}</main>
    <footer className='supports-[backdrop-filter]:bg-background/60 border-t py-12 backdrop-blur'>
      <div className='container mx-auto px-4 text-center text-gray-400'>
        <p>Made by Nermadie</p>
      </div>
    </footer>
  </div>
);

export default Layout;
