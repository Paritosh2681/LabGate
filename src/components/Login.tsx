import { motion } from 'motion/react';
import { Beaker, User, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (name: string, role: UserRole) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onLogin(name, role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      {/* Background abstract element just for the login screen */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel w-full max-w-md p-8 rounded-3xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 border border-white/20">
            <Beaker className="w-8 h-8 text-blue-300" />
          </div>
          <h1 className="text-3xl font-bold text-center">Lab Gateway</h1>
          <p className="text-white/60 mt-2 text-sm text-center">Secure authentication for facility access</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl mb-8 border border-white/10 relative">
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-lg z-10 transition-colors ${role === 'student' ? 'text-white' : 'text-white/50 hover:text-white'}`}
            onClick={() => setRole('student')}
          >
            Student
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-lg z-10 transition-colors ${role === 'teacher' ? 'text-white' : 'text-white/50 hover:text-white'}`}
            onClick={() => setRole('teacher')}
          >
            Teacher
          </button>
          <motion.div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/10 rounded-lg border border-white/10"
            animate={{ left: role === 'student' ? '4px' : 'calc(50%)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/70 uppercase tracking-widest mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input 
                type="text" 
                required
                placeholder="Enter your name"
                className="glass-input w-full py-3 pl-10 pr-4 rounded-xl text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          
          <button 
            type="submit"
            className="glass-button w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 mt-6"
          >
            {role === 'teacher' ? <ShieldCheck className="w-4 h-4" /> : null}
            Access Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}
