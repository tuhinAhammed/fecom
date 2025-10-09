// components/OffCanvas.jsx
import React, { useEffect } from "react"

const HeaderOffCanvas = ({ isOpen, onClose, title, width = "w-[35%]", children }) => {
  // Lock/unlock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => { document.body.style.overflow = "auto" }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full ${width} bg-white z-50 shadow-lg transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 py-6 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold capitalize">{title}</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        <div className="px-4 h-screen overflow-y-auto">{children}</div>
      </div>
    </>
  )
}

export default HeaderOffCanvas
