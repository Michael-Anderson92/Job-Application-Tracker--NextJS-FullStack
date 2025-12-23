import LinksDropdown from '../LinksDropdown';
import { UserButton } from '@clerk/nextjs';
import ThemeToggle from '../ThemeToggle';
import { colors } from '@/lib/design-system';
import Link from 'next/link';
import { Archivo_Black } from 'next/font/google';

// Add Archivo Black font
const archivoBlack = Archivo_Black({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

function Navbar() {
  return (
    <nav
      className='w-full py-4 px-4 sm:px-8 lg:px-16 border-b-4'
      style={{
        backgroundColor: colors.componentBg,
        borderBottomColor: colors.border,
        boxShadow: `0px 4px 0px ${colors.border}`
      }}
    >
      <div 
        className='flex items-center justify-between'
        style={{ maxWidth: '1600px', margin: '0 auto' }}
      >
        {/* Left Side - Logo & Desktop Links */}
        <div className='flex items-center gap-8'>
          {/* Logo */}
          <Link 
            href='/jobs' 
            className='hover:opacity-80 transition-opacity'
          >
            <span 
              className={`text-2xl ${archivoBlack.className}`}
              style={{ 
                color: colors.text,
                letterSpacing: '0.05em'
              }}
            >
              JOBHEAD
            </span>
          </Link>

          {/* Desktop Links */}
          <div className='hidden lg:flex items-center gap-6'>
            <Link 
              href='/jobs'
              className='font-semibold hover:opacity-70 transition-opacity'
              style={{ color: colors.text }}
            >
              Dashboard
            </Link>
            <Link 
              href='/jobs/stats'
              className='font-semibold hover:opacity-70 transition-opacity'
              style={{ color: colors.text }}
            >
              Stats
            </Link>
            <Link 
              href='/jobs'
              className='font-semibold hover:opacity-70 transition-opacity'
              style={{ color: colors.text }}
            >
              All Jobs
            </Link>
          </div>

          {/* Mobile Dropdown */}
          <div className='lg:hidden'>
            <LinksDropdown />
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className='flex items-center gap-3'>
          <ThemeToggle />
          <UserButton 
            afterSignOutUrl='/' 
            appearance={{
              elements: {
                avatarBox: 'w-12 h-12'
              }
            }}
          />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;