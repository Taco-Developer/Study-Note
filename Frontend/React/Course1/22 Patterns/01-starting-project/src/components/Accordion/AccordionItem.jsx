import { createContext, useContext } from 'react';

const AccordionItemContext = createContext({ id: null });

export function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context)
    throw new Error(
      'AccordionItem-related components must be wrapped by <Accordion.Item>.'
    );

  return context;
}

function AccordionItem({ id, className, children }) {
  const contextValue = { id };

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
}

export default AccordionItem;
