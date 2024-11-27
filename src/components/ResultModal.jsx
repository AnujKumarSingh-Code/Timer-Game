import { forwardRef , useImperativeHandle , useRef } from "react"
import { createPortal } from "react-dom";

const ResultModal =  forwardRef(function ResultModal({remainingTime , targetTime , onReset} , ref) {
    const dialog = useRef();
    const time = (remainingTime / 1000).toFixed(2);
    const score = Math.round(1 - (remainingTime / (targetTime * 1000)) * 100);
    useImperativeHandle(ref , () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    })
    
    return createPortal(
        <dialog ref={dialog} className="result-modal">
            <h2> You {remainingTime <= 0 ? 'Lost' : `Won with score ${score}`} </h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>you stopped the timer with {<strong>{time} remaining.</strong>} </p>
            <form method="dialog" onSubmit={onReset}>
                <button >Close</button>
            </form>
        </dialog> , document.getElementById('modal')
    )
})

export default ResultModal;