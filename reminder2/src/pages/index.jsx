import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Component() {

  const { data: session } = useSession()
  const [group_list, set_Group_list] = useState([])

  const get_group = async () => {
    const response = await fetch('/api/group/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });

    const data = await response.json();
    console.log(data.value);

    set_Group_list(data.value);
    console.log("dans la valeur du map :", group_list);

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);

    }
  };


  async function handleSubmit(event){
    event.preventDefault()
		const nameGroup = event.target.elements.groupName.value
		const descGroup = event.target.elements.groupDesc.value

    console.log(nameGroup);
    console.log(descGroup);

		const resp = await fetch('/api/group/create', {
			method: "POST",

			body: JSON.stringify({
				name: nameGroup,
				description: descGroup
			})

		})
    .then(resp => resp.json())
    get_group();
  }


  if (session) {

    return (
      <>
        <header id="connect">
          <button onClick={() => signOut()}>Sign out</button>
          <img id='pp' src={session.user.image} title={session.user.name}></img>
        </header>


        <div id='content'>

          <form onSubmit={handleSubmit}>
            <input type="text" id="groupName" placeholder='Ajouter un groupe' />
            <input type="text" id="groupDesc" placeholder='desc' />
            <button type='sumbit'>+</button>
          </form>

          <div id='text_refresh'>
            <h1>Liste de vos groupes : </h1>
            <button id="refresh" onClick={get_group}>&#128257;</button>
          </div>

          <div id="group_list">
            {
              group_list.map((item) => {
                return (
                  <div class="group_card">
                    <a href={"/group/" + item.id}>{item.name}</a>
                  </div>
                )
              })
            }
          </div>

        </div>

      </>
    )
  }
  return (
    <>
      <header id="connect">
        <button onClick={() => signIn()}>Sign in</button>
      </header>
      <h1>Not signed in</h1>
    </>
  )
}