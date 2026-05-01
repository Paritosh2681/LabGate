import { useState } from 'react';
import { User, Equipment, UserRole } from './types';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_EQUIPMENT: Equipment[] = [
  { id: '1', code: 'MIC-001', name: 'Compound Microscope', totalQuantity: 15, availableQuantity: 12 },
  { id: '2', code: 'CEN-012', name: 'Microcentrifuge', totalQuantity: 4, availableQuantity: 4 },
  { id: '3', code: 'PIP-045', name: 'Gilson Pipetman Set', totalQuantity: 20, availableQuantity: 18 },
  { id: '4', code: 'GLS-100', name: 'Volumetric Flask 500ml', totalQuantity: 50, availableQuantity: 34 },
  { id: '5', code: 'SPC-002', name: 'Spectrophotometer', totalQuantity: 2, availableQuantity: 0 },
  { id: '6', code: 'HOT-008', name: 'Hot Plate Stirrer', totalQuantity: 10, availableQuantity: 7 },
  { id: '7', code: 'SCL-015', name: 'Analytical Balance', totalQuantity: 5, availableQuantity: 3 },
  { id: '8', code: 'PHM-003', name: 'pH Meter', totalQuantity: 8, availableQuantity: 8 },
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>(INITIAL_EQUIPMENT);

  const handleLogin = (name: string, role: UserRole) => {
    setUser({ id: Math.random().toString(36).substr(2, 9), name, role });
  };

  const handleLogout = () => setUser(null);

  const handleAddEquipment = (newItem: Omit<Equipment, 'id'>) => {
    setEquipment(prev => [...prev, { ...newItem, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const handleTakeEquipment = (item: Equipment, takeQty: number) => {
    setEquipment(prev => prev.map(e => 
      e.id === item.id 
        ? { ...e, availableQuantity: Math.max(0, e.availableQuantity - takeQty) }
        : e
    ));
  };

  return (
    <div className="min-h-screen text-white overflow-hidden flex">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div 
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full flex"
          >
            <div className="flex-1 max-w-7xl mx-auto w-full">
              <Login onLogin={handleLogin} />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full h-screen overflow-hidden"
          >
            <Sidebar user={user} onLogout={handleLogout} />
            <div className="flex-1 h-screen overflow-y-auto relative">
              <div className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
              {user.role === 'teacher' ? (
                <TeacherDashboard equipment={equipment} onAddEquipment={handleAddEquipment} />
              ) : (
                <StudentDashboard equipment={equipment} onTakeEquipment={handleTakeEquipment} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
