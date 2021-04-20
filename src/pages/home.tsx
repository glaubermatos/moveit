import Router from "next/router";
import Cookies from 'js-cookie'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { ChallengeBox } from '../componentes/ChallengeBox'
import { CompletedChallenges } from '../componentes/CompletedChallenges'
import { Countdown } from '../componentes/Countdown'
import { ExperienceBar } from '../componentes/ExperienceBar'
import { Profile } from '../componentes/Profile'

import CountdownProvider from '../contexts/CountdownContext'
import ChallengesProvider from '../contexts/ChallengesContext'
import Sidebar from '../componentes/Sidebar'

import styles from '../styles/pages/Home.module.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { IncomingMessage } from "node:http";

interface User {
  name: string;
  login: string;
  level: number;
  currentExperience: number;
  experienceAcumulate: number;
  challengesCompleted: number;
  theme: string;
}

interface HomeProps {
  userLogado: User;
}

export default function Home({ }: HomeProps) {

  const {
    user,
    userLevelUp,
    updateUserExperience,
    updateUserChallengesCompleted } = useContext(AuthContext)

  return (

    <ChallengesProvider
      user={user}
      userLevelUp={userLevelUp}
      updateUserExperience={updateUserExperience}
      updateUserChallengesCompleted={updateUserChallengesCompleted}
    >
      <Head>
        <title>Inicio | move.it</title>
      </Head>

      <div className="app">
        <Sidebar />
        <div className="main">
          <div className="container">

            <ExperienceBar />

            <CountdownProvider>
              <section className={styles.main}>
                <div>
                  <Profile />
                  <CompletedChallenges />
                  <Countdown />
                </div>

                <div>
                  <ChallengeBox />
                </div>
              </section>
            </CountdownProvider>

          </div>
        </div>

      </div>

    </ChallengesProvider>

  )


}

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  let userLogado = {}

  const isAuthenticated = (ctx: GetServerSidePropsContext) => {
    if (!ctx?.req?.cookies) {
      return undefined
    }

    const { user } = ctx.req.cookies

    if (!user) {
      return undefined
    }

    userLogado = JSON.parse(user)

    return user
  };
  console.log('getServerSideProps')

  if (!isAuthenticated(context)) {
    context.res.writeHead(303, { Location: '/index' });
    context.res.end();
    console.log('não autenticado')
  }



  const { user } = context.req.cookies
  console.log('getServerSideProps')
  console.log(user)

  if (!user) {
    return undefined
  }

  const userLogado = JSON.parse(user)


  return {
    props: {
      userLogado
    }
  };
} */

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { users: usersCookiesArray } = context.req.cookies

//   let users: User[] = [];

//   if (usersCookiesArray) {
//     users = JSON.parse(usersCookiesArray);
//   }

//   return {
//     props: {
//       users/* ,
//       level: Number(1),
//       currentExperience: Number(0),
//       challengesCompleted: Number(0) */
//     }
//   };
// } 
