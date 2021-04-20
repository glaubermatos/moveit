import Head from 'next/head'
import Cookies from 'js-cookie';
import Sidebar from "../componentes/Sidebar";

import styles from '../styles/pages/Award.module.css'

interface User {
    name: string;
    login: string;
    level: number;
    currentExperience: number;
    experienceAcumulate: number;
    challengesCompleted: number;
    theme: string;
}

export default function Award() {

    let users: User[] = []
    let award: User[] = []

    const cookiesUsers = Cookies.get("users")
    if (cookiesUsers) {
        users = JSON.parse(cookiesUsers)
        award = users.sort(function compare(a, b) {
            if (a.experienceAcumulate < b.experienceAcumulate) return 1;
            if (a.experienceAcumulate > b.experienceAcumulate) return -1;
            return 0;
        })
    }

    return (
        <>
            <Head>
                <title>Leaderboard | move.it</title>
            </Head>

            <div className="app">
                <Sidebar />
                <div className="main">
                    <div className="container">
                        <div className={styles.leaderboard}>
                            <h2>Leaderboard</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>POSIÇÃO</th>
                                        <th>USUÁRIO</th>
                                        <th>DESAFIOS</th>
                                        <th>EXPERIÊNCIAS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {award.map((user, indice) => {
                                        return (
                                            <tr key={user.login}>
                                                <td>{indice + 1}</td>
                                                <td>
                                                    <div>
                                                        <img src={`https://github.com/${user.login}.png`} alt={user.name} />
                                                        <div>
                                                            <strong>{user.name}</strong>
                                                            <p>
                                                                <img src="/icons/level.svg" alt="Level" />
                                                            Level {user.level}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span>{user.challengesCompleted}</span> completados
                                            </td>
                                                <td>
                                                    <span>{user.currentExperience}</span> xp
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}