import { Home, FileText, Receipt, FileSpreadsheet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from './navigation/NavLink';

export function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around py-3">
          <NavLink to="/" isActive={isActive('/')}>
            <Home strokeWidth={1.5} />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          <NavLink to="/invoices" isActive={isActive('/invoices')}>
            <FileText strokeWidth={1.5} />
            <span className="text-xs mt-1">Invoices</span>
          </NavLink>
          <NavLink to="/quotations" isActive={isActive('/quotations')}>
            <FileSpreadsheet strokeWidth={1.5} />
            <span className="text-xs mt-1">Quotations</span>
          </NavLink>
          <NavLink to="/receipts" isActive={isActive('/receipts')}>
            <Receipt strokeWidth={1.5} />
            <span className="text-xs mt-1">Receipts</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}