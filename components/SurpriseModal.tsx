
import React from 'react';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SurpriseModal: React.FC<SurpriseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-pink-200/20 backdrop-blur-sm transition-all duration-300">
      <div 
        className="glass rounded-[40px] p-10 max-w-md w-full text-center relative overflow-hidden border-2 border-white/50 animate-[scaleIn_0.3s_ease-out]"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-lavender-300/30 rounded-full blur-2xl"></div>
        
        <div className="text-6xl mb-6">💝</div>
        <h3 className="font-handwritten text-5xl text-pink-500 mb-4">A Note for You</h3>
        <p className="font-poppins text-gray-700 text-lg leading-relaxed mb-8 italic">
          “You are not just my best friend, you are my happiest habit.”
        </p>
        
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-pink-400 to-pink-500 text-white font-poppins font-semibold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 active:scale-95"
        >
          Love you, Bestie! ✨
        </button>
      </div>
      
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SurpriseModal;
