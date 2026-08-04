import { createContext, ReactNode, useContext, useState } from 'react';

type MobileMenuContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

export const MobileMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <MobileMenuContext.Provider value={{ isOpen, open, close }}>
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) throw new Error('useMobileMenu must be used inside provider');
  return context;
};
