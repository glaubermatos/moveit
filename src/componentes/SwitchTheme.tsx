
import { useContext } from 'react'
import { Moon, Sun } from 'react-feather'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/components/SwitchTheme.module.css'

export default function SwitchTheme() {

    const { toggleTheme, user: { theme } } = useContext(AuthContext)

    const isDarkMode = theme === 'dark' ? true : false
    const html = document.querySelector('html')

    if (isDarkMode) {
        html.classList.add('dark')
    } else {
        html.classList.remove('dark')
    }


    function handleToggleTheme() {
        toggleTheme()
    }
    return (
        <div className={styles.switchTheme}>
            <input
                className={`${styles.checkbox} ${styles.hidden}`}
                id="checkbox"
                type="checkbox"
                onChange={handleToggleTheme}
                checked={isDarkMode}
            />
            <label htmlFor="checkbox">
                <Moon size={24} color="#f39c12" />
                <Sun size={24} color="#f1c40f" />
                <div className={styles.ball}></div>
            </label>
        </div>
    )
}