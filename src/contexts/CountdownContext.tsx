import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    isActiveTimer: boolean;
    hasFinishedTimer: boolean;
    minutes: number;
    seconds: number;
    pomodoro: number;
    activateTimer: () => void;
    inactiveTimer: () => void;
    finishTimer: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export default function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContext)

    const pomodoro = 0.1 * 60 // valor inicial padrão 25 minutos

    const [time, setTime] = useState(pomodoro)
    const [isActiveTimer, setIsActiveTimer] = useState(false)
    const [hasFinishedTimer, setHasFinishedTimer] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        inactiveTimer()
        setTime(pomodoro)
        setHasFinishedTimer(false)
    }

    useEffect(() => {
        if (isActiveTimer && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)

            }, 1000)
        } else if (isActiveTimer && time === 0) {
            finishTimer()
            inactiveTimer()
            startNewChallenge()
        }
    }, [isActiveTimer, time])

    function activateTimer() {
        setIsActiveTimer(true)
    }

    function inactiveTimer() {
        setIsActiveTimer(false)
    }

    function finishTimer() {
        setHasFinishedTimer(true)
    }

    return (
        <CountdownContext.Provider value={{
            isActiveTimer,
            minutes,
            seconds,
            pomodoro,
            hasFinishedTimer,
            activateTimer,
            inactiveTimer,
            finishTimer,
            resetCountdown
        }}
        >
            {children}
        </CountdownContext.Provider>
    );
}