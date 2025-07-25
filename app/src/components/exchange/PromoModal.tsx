import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import Button from "../ui/Button"

type PromoModalProps = {
    isOpen: boolean
    handleCloseEvent: () => void
    value: string
    setValue: (value: string) => void
    isErrorMessageShowing: boolean
    onSubmit: () => void
}

const PromoModal: React.FC<PromoModalProps> = ({ isOpen, handleCloseEvent, value, setValue, isErrorMessageShowing, onSubmit }) => {

    const input = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isOpen && input.current) {
            // Небольшая задержка для мобильных устройств
            setTimeout(() => {
                if (input.current) {
                    input.current.focus()
                    // Для iOS - программно показываем клавиатуру
                    input.current.click()
                }
            }, 100)
        }
    }, [isOpen])


    const handler = useRef<HTMLDivElement>(null)
    const [isHandlerDragged, setIsHandlerDragged] = useState(false)
    const [translateY, setTranslateY] = useState(0)
    const initClientY = useRef(0)

    const computePosition = (clientY: number) => {

        const translateY = (clientY - initClientY.current)
        setTranslateY(translateY)
    }

    const handleTouchend = (e: Event) => {
        setIsHandlerDragged(false)
        setTranslateY(0) // Сбрасываем позицию при отпускании
    }

    const handleMouseup = (e: Event) => {
        setIsHandlerDragged(false)
        setTranslateY(0) // Сбрасываем позицию при отпускании
    }

    const handleMousemove = (e: Event) => {
        if (!isHandlerDragged) return
        e.preventDefault() // Предотвращаем выделение текста
        const clientY = (e as MouseEvent).clientY
        computePosition(clientY)
    }

    const handleTouchMove = (e: Event) => {
        if (!isHandlerDragged) return
        e.preventDefault() // Предотвращаем скролл страницы
        const clientY = (e as TouchEvent).touches[0].clientY
        computePosition(clientY)
    }

    useEffect(() => {
        if (isHandlerDragged) {
            document.addEventListener('touchend', handleTouchend)
            document.addEventListener('mouseup', handleMouseup)
            document.addEventListener('touchmove', handleTouchMove)
            document.addEventListener('mousemove', handleMousemove)
        } else {
            document.removeEventListener('touchend', handleTouchend)
            document.removeEventListener('mouseup', handleMouseup)
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('mousemove', handleMousemove)
        }

        // Cleanup при размонтировании компонента
        return () => {
            document.removeEventListener('touchend', handleTouchend)
            document.removeEventListener('mouseup', handleMouseup)
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('mousemove', handleMousemove)
        }
    }, [isHandlerDragged])

    const handleTouchstart: React.TouchEventHandler = (e) => {
        e.preventDefault() // Предотвращаем скролл
        setIsHandlerDragged(true)
        initClientY.current = e.touches[0].clientY
    }

    const handleMouseDown: React.MouseEventHandler = (e) => {
        e.preventDefault() // Предотвращаем выделение текста
        setIsHandlerDragged(true)
        initClientY.current = e.clientY
    }

    useEffect(() => {

            if (translateY > 50) {
                handleCloseEvent()
            }
    }, [translateY])

    return (
        <div className={clsx("fixed z-50 top-0 bottom-0 left-0 right-0 w-screen h-screen bg-[#4E4E4EA8] bg-opacity-60 transition-opacity overflow-hidden", { "opacity-0 pointer-events-none ": !isOpen, "opacity-100 pointer-event-auto": isOpen })}>
            <div className={clsx("fixed z-60  w-screen bottom-0 left-0 right-0 flex items-center flex-col transition-all duration-500", { "translate-y-[110%]": !isOpen, "translate-y-0": isOpen})}>
                <div className={clsx({ "transition-transform duration-500 relative": !isHandlerDragged })} style={{ transform: `translateY(${translateY}px)` }}>
                    <div
                        onTouchStart={handleTouchstart}
                        onMouseDown={handleMouseDown}
                        ref={handler}
                        className="py-[8px] w-full flex justify-center cursor-grab active:cursor-grabbing select-none touch-none"
                        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                    >
                        <div className="h-[7px] rounded-full w-[60px] bg-white">
                        </div>
                    </div>
                    <div className="container w-screen rounded-t-[22px] bg-white pb-[12px] pt-[18px] flex flex-col gap-[13px] ">
                        <div className="flex items-center justify-between leading-[107%] text-[16px]">
                            <div className={clsx("text-[#FF6769] transition-opacity", { 'opacity-0': !isErrorMessageShowing, 'opacity-100': isErrorMessageShowing })}>Недействительный промокод</div>
                            <button onClick={handleCloseEvent} className="text-[#43C0FF]">Отмена</button>
                        </div>
                        <div className="relative">
                            <input
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                ref={input}
                                type="text"
                                placeholder="Ваш промокод"
                                className="placeholder:text-[#BFBFBF] leading-[107%] text-[16px] w-full px-0 py-10"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                            />
                            <div className="w-full h-2 rounded-2 bg-[#43C0FF]"></div>
                        </div>
                        <Button type="primary" onClick={onSubmit}>Применить</Button>
                    </div>
                    <div className="absolute left-0 top-full h-screen bg-white w-full"></div>

                </div>
            </div>
        </div>
    )
}

export default PromoModal