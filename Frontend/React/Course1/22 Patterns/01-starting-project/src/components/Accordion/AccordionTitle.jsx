import { useAccordionContext } from './Accordion';
import { useAccordionItemContext } from './AccordionItem';

function AccordionTitle({ className, children }) {
  const { toggleItem } = useAccordionContext();
  const { id } = useAccordionItemContext();

  const handleClick = () => toggleItem(id);

  return (
    <h3 className={className} onClick={handleClick}>
      {children}
    </h3>
  );
}

export default AccordionTitle;
