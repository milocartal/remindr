import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react'
import { useState } from 'react'
import { useRouter } from "next/router"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })



export default function page_groupe() {
    
    const {data : session} = useSession();
    const [info, set_info] = useState([])
    const [remind_list, set_Remind_list] = useState([])
    const [inputValueTitle, setInputValueTitle] = useState('');
    const [inputValueDate, setInputValueDate] = useState('');
    const [inputValueDate_form, setInputValueDate_form] = useState('');
    const [inputValueDesc, setInputValueDesc] = useState('');
    const [inputValueColor, setInputValueColor] = useState('');   
    const router = useRouter()
    const  {id_group}  = router.query;




    

    const handleInputChangeTitle = (event) => {
        setInputValueTitle(event.target.value);
      };

      const handleInputChangeDate = (event) => {
        setInputValueDate_form(event.target.value)
        setInputValueDate(event.target.valueAsDate);
      };

      const handleInputChangeDesc = (event) => {
        setInputValueDesc(event.target.value);
      };

      const handleInputChangeColor = (event) => {
        setInputValueColor(event.target.value);
      };
    
    const get_group = async () => {
                
            const response = await fetch('http://localhost:3000/api/group/get', {
                method: 'GET',
                body: JSON.stringify({ id_group : id_group }),
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            });
            
           const data = await response.json();
           set_info(data.value);



            const response_le2 = await fetch('/api/remind/', {
              method: 'GET',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            });
          
            const data_le2 = await response_le2.json();
            console.log(data_le2.value);
            
            set_Remind_list(data_le2.value);
        }

    const handleButtonClick = async () => {

            const response = await fetch('/api/remind/add_remind', {
              method: 'POST',
              
              body: JSON.stringify({ title : inputValueTitle, dateRendu : inputValueDate, desc : inputValueDesc, color: inputValueColor , id_group : id_group}),
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            });
            
            
            if (!response.ok)
            {
              throw new Error(`Error! status: ${response.status}`);
            }
        };


    const sendmail = async () => {
      const response = await fetch('/api/sendmail', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });

      const data = await response.json();
      console.log(data);

    }
    
    if (session ) {
    return (
        
        <>
            <header id="connect">
            <button onClick={() => signOut()}>Sign out</button>
            <img id='pp' src={session.user.image} title={session.user.name}></img>
            </header>


            <div id='content'>

                <h1 class='group_name'>{info.name}</h1>
                <div id='add_group'>
                    <input type="text" value={inputValueTitle} onChange={handleInputChangeTitle} placeholder='Titre'/>
                    <input type="date" value={inputValueDate} onChange={handleInputChangeDate} placeholder='Date Rendu'/>
                    <input type="text" value={inputValueDesc} onChange={handleInputChangeDesc} placeholder='Description'/>
                    <input type="color" value={inputValueColor} onChange={handleInputChangeColor} />
                    <button onClick={handleButtonClick}>+</button>
                </div>

                <div id="test_mail">
                  <button onClick={sendmail}>SEND MAILLLLL</button>
                </div>


                <div id='text_refresh'>
                    <h1>Les Rappel de votre groupe : </h1>
                    <button id="refresh" onClick={get_group}>&#128257;</button>
                </div>

                <div id="remind_list">
                    {
                        remind_list.map((item) => {
                        return (
                            <div class="remind_card">
                                <h2>{item.title}</h2>
                                <h3>{ (new Date(item.dateRendu)).toLocaleDateString() }</h3>
                                <p>{item.desc}</p>
                            </div>
                        )})
                    }
                 </div>

            </div>

        </>
        ); }
        else {
            return (  
                <di> Your not signIn</di>
            )
        }
  }
