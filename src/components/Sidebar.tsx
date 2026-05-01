import { LogOut, LayoutDashboard, Database, Beaker } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User;
  onLogout: () => void;
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  return (
    <div className="w-64 flex flex-col h-screen p-6 sticky top-0 border-r border-white/5 bg-white/[0.02] backdrop-blur-3xl">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
          <Beaker className="w-5 h-5 text-blue-300" />
        </div>
        <div>
          <h2 className="font-bold text-lg leading-none">LabGate</h2>
          <span className="text-xs text-white/50 uppercase tracking-wider">{user.role}</span>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl border border-white/10 text-sm font-medium transition-all hover:bg-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <LayoutDashboard className="w-4 h-4 text-white/80" />
          Dashboard
        </button>
        {user.role === 'teacher' && (
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 rounded-xl border border-transparent text-sm font-medium transition-all hover:bg-white/5 hover:text-white hover:border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Database className="w-4 h-4" />
            Inventory
          </button>
        )}
      </div>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 border border-white/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-white/50 truncate">ID: {user.id.substring(0, 8)}</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-300 hover:text-red-200 transition-colors bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      </div>
    </div>
  );
}
