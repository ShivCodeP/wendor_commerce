import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

interface ThankYouDialogProps {
  onClose: () => void;
}

export default function ThankYouDialog({ onClose }: ThankYouDialogProps) {
  const queryClient = useQueryClient();
  React.useEffect(() => {
    const timer = setTimeout(async () => {
      await queryClient.invalidateQueries({ queryKey: ['inventory'] });
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full mx-4 text-center shadow-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
        </motion.div>
        
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
        >
          Thank You!
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-base sm:text-lg"
        >
          Your order has been placed successfully. Your snacks will be dispensed shortly!
        </motion.p>
      </motion.div>
    </div>
  );
}