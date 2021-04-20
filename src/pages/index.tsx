import React, { FormEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { AuthContext } from '../contexts/AuthContext';
import { LogIn, Loader } from 'react-feather'

import styles from '../styles/pages/Login.module.css'

interface User {
    name: string;
    login: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default function Login() {

    const [username, setUserName] = useState('')
    const { login, loading } = useContext(AuthContext)

    function handleLoginWithGithub(e: FormEvent) {
        e.preventDefault()
        if (!login(username)) {
            alert('Desculpe! não encontramos um usuário, tente novamente')
        }

    }

    return (
        <>
            <Head>
                <title>Login com Github | move.it</title>
            </Head>

            <div className={styles.login}>
                <img src="/icons/simbolo.svg" alt="" />

                <div>
                    <img src="/icons/logo.svg" alt="Logo moveit" />
                    <form
                        onSubmit={handleLoginWithGithub}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    >
                        <strong>Bem vindo</strong>
                        <div>
                            <img src="/icons/github.svg" alt="Github" />
                            <p>
                                Faça login com seu Github
                                para começar
                        </p>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Digite seu username"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            {username.length > 0 ? (
                                <button className={styles.activeButton} >
                                    {loading ? (
                                        <Loader color="#fff" size={32} className={styles.loading} />
                                    ) : (
                                        <LogIn color="#fff" size={32} />

                                    )}
                                </button>
                            ) : (
                                <button disabled >
                                    <LogIn color="#fff" size={32} />
                                </button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     console.log('getServerSideProps')
//     const { users: usersCookiesArray } = context.req.cookies

//     let users: User[] = [];

//     if (usersCookiesArray) {
//         users = JSON.parse(usersCookiesArray);
//     }

//     return {
//         props: {
//             users: users ?? []/* ,
//         level: Number(1),
//         currentExperience: Number(0),
//         challengesCompleted: Number(0) */
//         }
//     };
// }
