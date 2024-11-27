import { useState , useRef } from "react";
import ResultModal from "./ResultModal";



export default function TimerChallenge({title , targetTime}){
    const timer = useRef();

    const [timerExpired , setTimerExpired] = useState(false);
    const [timerStarted , setTimerStarted] = useState(false);
    

    function handleStart(){
        setTimerStarted(true);
        timer.current = setTimeout(()=>{ setTimerExpired(true) } , targetTime * 1000)
    }

    function handleStop() {
        clearTimeout(timer.current);
    }

    return(
        <>
            {timerExpired && <ResultModal result="Lost" targetTime={targetTime} />}
            <section className="challenge">
                <h2>{title} </h2>
                {timerExpired && <p>You Lost</p>}
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerStarted ? 'active' : undefined}>
                    {timerStarted ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
        
    )
}