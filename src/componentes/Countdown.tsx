import { useContext, useEffect, useState } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import { Play, X, Check } from 'react-feather'

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {

    const {
        minutes,
        seconds,
        pomodoro,
        hasFinishedTimer,
        isActiveTimer,
        resetCountdown,
        activateTimer,
    } = useContext(CountdownContext)

    const [minutesLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('')


    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            { hasFinishedTimer ? (

                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                    <span style={{ marginLeft: '1rem' }}>
                        <Check size={20} />
                    </span>
                    <div>
                        <div style={{ width: `${100}%` }}></div>
                    </div>
                </button>

            ) : (

                <>
                    { isActiveTimer ? (

                        <button
                            type='button'
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                            <X size={24} style={{ marginLeft: '1rem' }} />

                            <div>
                                <div style={{ animationDuration: `${pomodoro}s` }}></div>
                            </div>
                        </button>

                    ) : (

                        <button
                            type='button'
                            className={styles.countdownButton}
                            onClick={activateTimer}
                        >
                            Iniciar um ciclo
                            <Play size={24} style={{ marginLeft: '1rem' }} />
                        </button>

                    )}
                </>

            )}

        </div>
    );
}