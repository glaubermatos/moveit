import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'
import SwitchTheme from './SwitchTheme';

export function Profile() {
    const { user } = useContext(ChallengesContext)
    /* const { user } = useContext(AuthContext) */

    return (
        <div className={styles.profileContainer}>
            <img src={`https://github.com/${user.login}.png`} alt={user.name} />
            <section>
                <strong>{user.name}</strong>
                <div>
                    <p>
                        <img src="icons/level.svg" alt="Level" />
                        Level <span>{user.level}</span>
                    </p>
                    <SwitchTheme />
                </div>
            </section>
        </div>
    );
}