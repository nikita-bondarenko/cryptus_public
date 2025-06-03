import React, { memo, useEffect, useState } from "react";
import { CurrencyPosition } from "../request/RequestDetails";
import SectionHeading, { SectionHeadingProps } from "../ui/SectionHeading";
import CurrencyInput from "./CurrencyInput";

export type ExchangeInputCryptoProps = {
  position: CurrencyPosition;
} & SectionHeadingProps;

const ExchangeInputCrypto: React.FC<ExchangeInputCryptoProps> = memo(({ title ,rate, minValue}) => {
    const [value, setValue] = useState<number | null>(null)
    useEffect(() => {console.log(value)}, [value])
  return (
    <div className="">
      <div>
        <SectionHeading title={title} rate={ rate} minValue={minValue}></SectionHeading>
        <CurrencyInput value={value} onChange={value => setValue(value)}></CurrencyInput>
      </div>    
    </div>
  );
});

ExchangeInputCrypto.displayName = "ExchangeInputCrypto";

export default ExchangeInputCrypto;
