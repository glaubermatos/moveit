import Cookies from 'js-cookie'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";

interface User {
    name: string;
    login: string;
    level: number;
    currentExperience: number;
    experienceAcumulate: number;
    challengesCompleted: number;
    theme: string;
}

interface AuthContextData {
    user: User;
    login: (username: string) => {};
    logout: () => void;
    loading: boolean;
    userLevelUp: () => void;
    updateUserExperience: (finalExperience: number, experienceAcumulate: number) => void;
    updateUserChallengesCompleted: () => void;
    toggleTheme: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext(null as AuthContextData)

export default function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(false)
    const [level, setLevel] = useState<number>()
    const [currentExperience, setCurrentExperience] = useState<number>()
    const [challengesCompleted, setChallengesCompleted] = useState<number>()
    const [theme, setTheme] = useState<string>()
    const [experienceAcumulate, setExperienceAcumulate] = useState<number>()

    async function login(username: string) {
        setLoading(true)
        const response = await fetch(`https://api.github.com/users/${username}`)

        if (response.status === 404) {
            setLoading(false)
            return undefined
        }

        const { name, login } = await response.json()

        // se encontrou o usuário
        const users = getUsersCookies()

        const userFound = users.find(user => user.login === login)

        if (userFound) {
            setUser({ ...userFound })
        } else {
            const newUser = createNewUser(login, name)
            const newArrayUsers = [...users, { ...newUser }]

            setUser({ ...newUser })
            setUsersCookies(newArrayUsers)
        }

        setLoading(false)
        Router.push('/home')

    }

    useEffect(() => {
        setUserLogadoCookies()
    }, [user])

    useEffect(() => {
        const users = getUsersCookies()

        if (users.length > 0) {
            const updateDataUser = {
                ...user,
                theme: theme,
            }
            updateDataUserOnCookies(updateDataUser)
        }
    }, [theme])

    useEffect(() => {
        const users = getUsersCookies()

        if (users.length > 0) {
            const updateDataUser = {
                ...user,
                level: level ?? 1,
                currentExperience: currentExperience ?? 0,
                challengesCompleted: challengesCompleted ?? 0,
                experienceAcumulate: experienceAcumulate
            }

            updateDataUserOnCookies(updateDataUser)
        }
    }, [level, currentExperience, challengesCompleted])

    function updateDataUserOnCookies(updateDataUser: User) {
        const users = getUsersCookies()
        setUser(updateDataUser)

        const userIndex = users.findIndex(user => user.login === updateDataUser.login)

        users[userIndex] = updateDataUser

        setUsersCookies(users)
    }

    function createNewUser(login: string, name: string) {
        return {
            name,
            login,
            level: 1,
            currentExperience: 0,
            challengesCompleted: 0,
            theme: 'light',
            experienceAcumulate: 0
        } as User
    }

    function setUserLogadoCookies() {
        Cookies.set('user', JSON.stringify(user))
    }

    function setUsersCookies(users: User[]) {
        Cookies.set('users', JSON.stringify(users))
    }

    function getUsersCookies() {
        const arrayUsersCookies = Cookies.get('users')
        let users: User[] = []

        if (arrayUsersCookies) {
            users = JSON.parse(arrayUsersCookies)
        }

        return users
    }

    function updateUserChallengesCompleted() {
        setChallengesCompleted(user.challengesCompleted + 1)
    }

    function updateUserExperience(finalExperience: number, experienceAcumulate: number) {
        setExperienceAcumulate(experienceAcumulate)
        setCurrentExperience(finalExperience)
    }

    function userLevelUp() {
        console.log('userLevelUp() {}')
        setLevel(user.level + 1)
    }

    function toggleTheme() {
        const toggle = theme === 'dark' ? 'light' : 'dark'

        const html = document.querySelector('html')
        html.classList.toggle('dark')

        setTheme(toggle)
    }

    function logout() {
        setUser({} as User)
        Router.push('/')
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            loading,
            userLevelUp,
            updateUserExperience,
            updateUserChallengesCompleted,
            toggleTheme
        }}>
            {children}
        </AuthContext.Provider>
    );
}



// export const getServerSideProps: GetServerSideProps = async (context) => {
//     let userLogado = {}

//     const isAuthenticated = (ctx: GetServerSidePropsContext) => {
//         if (!ctx?.req?.cookies) {
//             return undefined
//         }

//         const { user } = ctx.req.cookies

//         if (!user) {
//             return undefined
//         }

//         const usr: User = JSON.parse(user)

//         if (!usr.login) {
//             return undefined
//         }

//         userLogado = JSON.parse(user)

//         return user
//     };
//     console.log('getServerSideProps')

//     if (!isAuthenticated(context)) {
//         context.res.writeHead(303, { Location: '/' });
//         context.res.end();
//         console.log('não autenticado')
//     }



//     /* const { user } = context.req.cookies
//     console.log('getServerSideProps')
//     console.log(user)

//     if (!user) {
//       return undefined
//     }

//     const userLogado = JSON.parse(user) */

//     return {
//         props: {
//             userLogado
//         }
//     };
// }