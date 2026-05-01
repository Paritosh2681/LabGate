import { motion } from 'motion/react';
import { Plus, Settings2, Search, Filter } from 'lucide-react';
import { Equipment } from '../types';
import { useState } from 'react';

interface TeacherDashboardProps {
  equipment: Equipment[];
  onAddEquipment: (e: Omit<Equipment, 'id'>) => void;
}

export function TeacherDashboard({ equipment, onAddEquipment }: TeacherDashboardProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newQty, setNewQty] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'in-stock' | 'out-of-stock'>('all');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newName || !newQty) return;
    
    onAddEquipment({
      code: newCode,
      name: newName,
      totalQuantity: parseInt(newQty),
      availableQuantity: parseInt(newQty)
    });
    
    setNewCode('');
    setNewName('');
    setNewQty('');
    setShowAdd(false);
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = availabilityFilter === 'all' || 
                          (availabilityFilter === 'in-stock' && item.availableQuantity > 0) ||
                          (availabilityFilter === 'out-of-stock' && item.availableQuantity === 0);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Inventory Control</h1>
          <p className="text-white/60">Manage lab equipment, track availability, and restock items.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="glass-button px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Register Equipment
        </button>
      </div>

      {showAdd && (
        <motion.form 
          initial={{ opacity: 0, height: 0, scale: 0.95 }}
          animate={{ opacity: 1, height: 'auto', scale: 1 }}
          className="glass-panel p-6 rounded-2xl mb-8 border-indigo-500/30"
          onSubmit={handleAdd}
        >
          <h3 className="font-semibold mb-4 text-lg">New Item Registry</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Item Code</label>
              <input required type="text" className="glass-input w-full py-2 px-3 rounded-xl text-sm" placeholder="e.g. MIC-001" value={newCode} onChange={e => setNewCode(e.target.value)}/>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Equipment Name</label>
              <input required type="text" className="glass-input w-full py-2 px-3 rounded-xl text-sm" placeholder="e.g. Compound Microscope" value={newName} onChange={e => setNewName(e.target.value)}/>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Initial Quantity</label>
              <input required type="number" min="1" className="glass-input w-full py-2 px-3 rounded-xl text-sm" placeholder="0" value={newQty} onChange={e => setNewQty(e.target.value)}/>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={() => setShowAdd(false)} className="px-5 py-2 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">Cancel</button>
            <button type="submit" className="glass-button px-6 py-2 rounded-xl text-sm font-medium">Add to Database</button>
          </div>
        </motion.form>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text" 
            placeholder="Search by name or code..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input w-full py-2.5 pl-10 pr-4 rounded-xl text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <select 
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value as any)}
            className="glass-input py-2.5 px-3 rounded-xl text-sm appearance-none min-w-[160px] cursor-pointer"
          >
            <option value="all" className="bg-[#1a123a] text-white">All Statuses</option>
            <option value="in-stock" className="bg-[#1a123a] text-white">In Stock</option>
            <option value="out-of-stock" className="bg-[#1a123a] text-white">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-widest text-white/50">Code</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-widest text-white/50">Name</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-widest text-white/50">Total</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-widest text-white/50">Available</th>
                <th className="py-4 px-6 text-xs font-semibold uppercase tracking-widest text-white/50 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.map((item, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.id} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-6 font-mono text-xs text-white/70">{item.code}</td>
                  <td className="py-4 px-6 font-medium">{item.name}</td>
                  <td className="py-4 px-6 text-white/80">{item.totalQuantity}</td>
                  <td className="py-4 px-6 font-semibold">
                    <span className={item.availableQuantity === 0 ? 'text-red-400' : 'text-emerald-400'}>
                      {item.availableQuantity}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 text-white/50 hover:text-white">
                      <Settings2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filteredEquipment.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-white/40">No equipment found matching criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
