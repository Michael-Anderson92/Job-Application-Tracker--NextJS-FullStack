import Navbar from '@/components/navigation/Navbar';
import { colors } from '@/lib/design-system';
import { PropsWithChildren } from 'react';

function layout({ children }: PropsWithChildren) {
  return (
    <main
      className='w-screen'
      style={{
        backgroundColor: colors.pageBackground,
        backgroundImage: `
          linear-gradient(rgba(27, 166, 138, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(27, 166, 138, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px'
      }}
    >
      <div className='lg:col-span-4'>
        <Navbar />
        <div
          className='py-16 px-4 sm:px-8 lg:px-16'
          style={{
            maxWidth: '1400px',  // Add this - controls max width
            margin: '0 auto'      // Add this - centers the content
          }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
export default layout;