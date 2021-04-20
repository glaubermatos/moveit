import { createContext, ReactNode, useEffect, useState } from 'react'

import LevelUpModal from '../componentes/LevelUpModal'

import challenges from '../../challenges.json'

interface User {
    name: string;
    login: string;
    level: number;
    currentExperience: number;
    experienceAcumulate: number;
    challengesCompleted: number;
    theme: string;
}

interface Challenge {
    type: 'type' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    user: User;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    user: User;
    userLevelUp: () => void;
    updateUserExperience: (finalExperience: number, experienceAcumulate: number) => void;
    updateUserChallengesCompleted: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export default function ChallengesProvider({
    children,
    user,
    userLevelUp,
    updateUserExperience,
    updateUserChallengesCompleted, }: ChallengesProviderProps) {

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((user.level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    function levelUp() {
        userLevelUp()

        const DOIS_SEGUNDOS = 1800

        setTimeout(() => {
            setIsLevelUpModalOpen(true)
        }, DOIS_SEGUNDOS)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp`,
                silent: true,
                icon: '/favicon.png'

            }).onclick = (event) => {

                event.preventDefault()

                if (document.visibilityState === 'hidden' || window.blur) {
                    window.focus()
                }
            }
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge
        let finalExperience: number = user.currentExperience + amount
        const experienceAcumulate = user.experienceAcumulate + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        updateUserExperience(finalExperience, experienceAcumulate)
        updateUserChallengesCompleted()

        resetChallenge()
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }

    return (
        <ChallengesContext.Provider value={{
            user,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge,
            experienceToNextLevel,
            closeLevelUpModal
        }}>

            {children}

            {isLevelUpModalOpen && <LevelUpModal />}

        </ChallengesContext.Provider>
    );
}