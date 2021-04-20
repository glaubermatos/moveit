import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUp.module.css'

export default function LevelUpModal() {

    const { user: { level }, closeLevelUpModal } = useContext(ChallengesContext)

    return (
        <div className={`${styles.levelUpModal_overlay} ${styles.active}`}>
            <div className={styles.levelUpModal}>
                <header>
                    {level}
                </header>
                <strong>Parabéns</strong>
                <p>
                    Você alcançou um novo level.
                </p>
                {/* <a href="#" className={styles.shareTwitter} onClick={closeModal}>
                    Compartilhar no twitter
                    <img src="/icons/twitter.svg" alt="" />
                </a> */}
                <button type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>
            </div>
        </div>
    );
}