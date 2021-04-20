import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Home, Award, LogOut } from 'react-feather'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/components/Sidebar.module.css'

export default function Sidebar() {

    const { logout } = useContext(AuthContext)

    const router = useRouter()

    return (
        <div className={styles.sidebar}>
            <img src="/icons/logo2.svg" alt="Logo Moveit" />
            <ul>
                <li className={router.asPath === '/home' ? styles.active : ''} >
                    <Link href="/home" >
                        <a><Home size={32} /></a>
                    </Link>
                </li>
                <li className={router.asPath === '/award' ? styles.active : ''} >
                    <Link href="/award">
                        <a><Award size={32} /></a>
                    </Link>
                </li>
            </ul>
            <ul>
                {/* <li>
                    <div className={styles.switchTheme}>
                        <input
                            className={`${styles.checkbox} ${styles.hidden}`}
                            id="checkbox"
                            type="checkbox"
                            onChange={handleToggleTheme}
                        />
                        <label htmlFor="checkbox">
                            <Moon size={24} color="#f39c12" />
                            <Sun size={24} color="#f1c40f" />
                            <div className={styles.ball}></div>
                        </label>
                    </div>
                </li> */}
                <li>
                    {/* <Link href="/" > */}
                    <a title="Logout" onClick={logout}>
                        <LogOut size={32} />
                    </a>
                    {/* </Link> */}
                </li>
            </ul>
        </div>
    );
}