import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import AdditionallySectionButton from "./AdditionallySectionButton";

interface ExpandableListProps {
  items: Array<{
    text: string;
    onClick: () => void;
  }>;
  title: string;
}

export default function ExpandableList({ items, title }: ExpandableListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [listHeight, setListHeight] = useState(0);

  const openList = () => {
    if (listRef.current) {
      setListHeight(listRef.current.clientHeight);
    }
  };

  const closeList = () => {
    setListHeight(0);
  };

  useEffect(() => {
    if (isOpen) {
      openList();
    } else {
      closeList();
    }
  }, [isOpen]);

  return (
    <div className="overflow-hidden rounded-8">
      <AdditionallySectionButton
        onClick={() => setIsOpen((prev) => !prev)}
        arrowPosition={isOpen ? "bottom" : "top"}
        arrow
      >
        {title}
      </AdditionallySectionButton>
      <div
        className={clsx(
          "transition-all duration-500 border-neutral-gray-400 relative overflow-hidden",
          { "border-top": isOpen }
        )}
        style={{ height: listHeight }}
      >
        <ul className="absolute w-full bottom-0 left-0" ref={listRef}>
          {items.map((item, index) => (
            <li key={index}>
              <AdditionallySectionButton border onClick={item.onClick}>
                {item.text}
              </AdditionallySectionButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 