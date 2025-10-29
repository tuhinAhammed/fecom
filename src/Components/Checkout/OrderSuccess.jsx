const OrderSuccess = ({ show, onClose }) => {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // click outside to close
          >
            <motion.div
              onClick={(e) => e.stopPropagation()} // prevent background click
              className="relative bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm mx-auto"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
              >
                <BiX className="w-6 h-6" />
              </button>
  
              <BiCheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                Your order has been placed successfully!
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Thank you for shopping with us. You’ll receive confirmation soon.
              </p>
  
              <div className="flex flex-col gap-2">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
                >
                  View My Orders
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Track My Order
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
  