import React, { useEffect } from "react"; // Import useEffect
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

const FactsModal = ({ open, setOpen, fact, duration = 7000 }) => { // Default duration to 7000ms (7 seconds)
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false); // Close the modal after the specified duration
      }, duration);
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [open, setOpen, duration]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[url('/bg.jpg')] bg-cover bg-center rounded-lg max-w-md mx-auto text-black border border-black">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-black">Did You Know ? 🤔</DialogTitle>
        </DialogHeader>
        <p className="mt-4 font-semibold text-center text-black">{fact}</p>
        <DialogFooter className="flex justify-center mt-3">
          {/* You can add buttons here if needed */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FactsModal;
