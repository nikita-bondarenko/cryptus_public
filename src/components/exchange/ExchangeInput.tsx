import React, { memo } from "react";
import { CurrencyPosition } from "../request/RequestDetails";
import ExchangeCardInput from "./ExchangeCardInput";
import ExchangeCashInput from "./ExchangeCashInput";
import ExchangeCryptoInput from "./ExchangeCryptoInput";

export type ExchangeInputProps = {
  position: CurrencyPosition;
  type: "card" | "cash" | "crypto";
};

const ExchangeInput: React.FC<ExchangeInputProps> = memo(({ position, type }) => {
  switch (type) {
    case "card":
      return <ExchangeCardInput position={position} />;
    case "cash":
      return <ExchangeCashInput position={position} />;
    case "crypto":
      return <ExchangeCryptoInput position={position} />;
    default:
      return null;
  }
});

ExchangeInput.displayName = "ExchangeInput";

export default ExchangeInput; 