import React, { memo } from "react";
import ExchangeTypeItem, { ExchangeTypeItemProps } from "./ExchangeTypeItem";
import { CurrencyPosition } from "../request/RequestDetails";

export type ExchangeTypeBlockProps = {
  title: string;
  buttons: ExchangeTypeItemProps[];
  position: CurrencyPosition
};

const ExchangeTypeBlock: React.FC<ExchangeTypeBlockProps> = memo(
  ({ title, buttons, position }) => {

    return (
      <div className="relative rounded-6 bg-white overflow-hidden flex flex-col items-center after:absolute after:inset-0 after:border after:border-neutral-gray-200 after:rounded-6 after:z-10 after:pointer-events-none">
        <h2 className="py-15 px-19 w-full font-medium text-16 leading-normal">{title}</h2>
        {buttons.map((button) => (
          <ExchangeTypeItem {...button} key={button.type} position={position}></ExchangeTypeItem>
        ))}
      </div>
    );
  }
);

ExchangeTypeBlock.displayName = "ExchangeTypeBlock";

export default ExchangeTypeBlock;
