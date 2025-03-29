import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

interface NotificationProps {
  show: boolean;
  message: string;
  description?: string;
  onClose: () => void;
}

const Notification = ({
  show,
  message,
  description,
  onClose,
}: NotificationProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-20 right-5 z-50 max-w-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 p-1 bg-green-100 dark:bg-green-900/30 rounded-full mr-3">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 mr-2">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                  {message}
                </p>
                {description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
