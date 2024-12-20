import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: ReactNode;
}

export function NavLink({ to, isActive, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center ${
        isActive ? 'text-[#FF771F]' : 'text-[#2B372A]'
      }`}
    >
      {children}
    </Link>
  );
}