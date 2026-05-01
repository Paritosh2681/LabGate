import { motion, AnimatePresence } from 'motion/react';
import { Package, Search } from 'lucide-react';
import { Equipment } from '../types';
import { useState } from 'react';
import { EquipmentModal } from './EquipmentModal';

interface StudentDashboardProps {
  equipment: Equipment[];
  onTakeEquipment: (item: Equipment, qty: number) => void;
}

export function StudentDashboard({ equipment, onTakeEquipment }: StudentDashboardProps) {
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);

  const filtered = equipment.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleTake = (item: Equipment, qty: number) => {
    onTakeEquipment(item, qty);
    setSelectedItem(null);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Equipment Catalog</h1>
          <p className="text-white/60">Browse available lab equipment and request items for your session.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search catalog..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="glass-input w-full py-3 pl-11 pr-4 rounded-2xl text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.03 }}
              key={item.id}
              className="glass-panel p-6 rounded-3xl flex flex-col group relative overflow-hidden"
            >
              {/* Decorative radial glow behind items */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-blue-400/10 transition-colors pointer-events-none" />
              
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Package className="w-6 h-6 text-indigo-300" />
              </div>
              
              <div className="mb-1 text-xs font-mono text-white/40">{item.code}</div>
              <h3 className="text-lg font-semibold mb-6 flex-1">{item.name}</h3>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs uppercase tracking-widest text-white/50">Status</div>
                <div className={`text-xs font-bold px-2 py-1 rounded-md bg-white/5 ${item.availableQuantity > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {item.availableQuantity} available
                </div>
              </div>

              <button 
                onClick={() => setSelectedItem(item)}
                disabled={item.availableQuantity === 0}
                className="w-full py-3 rounded-xl border border-white/20 bg-white/5 font-medium text-sm transition-all hover:bg-white/10 hover:border-white/30 disabled:opacity-30 flex justify-center mt-auto"
              >
                Request Item
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/40">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p>No equipment matches your search criteria.</p>
        </div>
      )}

      <AnimatePresence>
        {selectedItem && (
          <EquipmentModal 
            key="modal"
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
            onTake={handleTake} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
