import clsx from 'clsx'
import React, { CSSProperties } from 'react'
export type IconProps = {
    src: string,
    className: string
}

export default function Icon({src, className}:IconProps) {
  return (
    <span style={{ backgroundImage: `url(/images/icons/${src})`} as CSSProperties} className={clsx('block bg-no-repeat bg-contain ', className, {
      "rotate-[-13.88deg]": src === 'btc.svg'
    })}></span>
  )
}
