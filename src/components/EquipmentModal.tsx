import { motion } from 'motion/react';
import { X, Zap, Minus, Plus } from 'lucide-react';
import { Equipment } from '../types';
import { useState, useEffect } from 'react';

interface EquipmentModalProps {
  item: Equipment;
  onClose: () => void;
  onTake: (item: Equipment, quantity: number) => void;
}

export function EquipmentModal({ item, onClose, onTake }: EquipmentModalProps) {
  const [qty, setQty] = useState(1);

  // Reset qty when item changes
  useEffect(() => {
    setQty(1);
  }, [item]);

  const handleTake = () => {
    onTake(item, qty);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-panel w-full max-w-lg p-8 rounded-[2rem] relative z-10 border-t-white/30 border-l-white/30"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono text-blue-300 mb-4">
            {item.code}
          </div>
          <h2 className="text-3xl font-bold mb-2">{item.name}</h2>
          <p className="text-white/60 text-sm">
            Please select the quantity you need for your lab session. Ensure all equipment is returned in its original condition.
          </p>
        </div>

        <div className="flex bg-white/5 rounded-2xl p-6 mb-8 border border-white/10 items-center justify-between">
          <div>
            <span className="block text-xs uppercase tracking-widest text-white/50 mb-1">Available Stack</span>
            <span className="text-3xl font-light">{item.availableQuantity}</span>
            <span className="text-xs text-white/40 ml-2">/ {item.totalQuantity} total</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="block text-xs uppercase tracking-widest text-white/50 mb-2">Request Quantity</span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                disabled={qty <= 1}
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-xl font-medium">{qty}</span>
              <button 
                onClick={() => setQty(Math.min(item.availableQuantity, qty + 1))}
                disabled={qty >= item.availableQuantity}
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={handleTake}
          disabled={item.availableQuantity === 0}
          className="glass-button w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
        >
          <Zap className="w-5 h-5 fill-white" />
          {item.availableQuantity === 0 ? 'Out of Stock' : 'Checkout Equipment'}
        </button>
      </motion.div>
    </div>
  );
}
