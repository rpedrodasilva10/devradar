import React, { useState, useEffect } from 'react'
import api from './services/api.js'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'


import DevForm from './components/DevForm/index.js'
import DevItem from './components/DevItem/index.js'

function App() {
    const [devs, setDevs] = useState([])

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs')

            setDevs(response.data.length ? response.data : [])
        }

        loadDevs()
    }, [])

    async function handleAddDev(data) {
        const response = await api.post('/devs', data)

        setDevs([...devs, response.data])
    }

    async function handleDeleteDev(dev){
        const { github_username } = dev
        
        
        const response = await api.delete('/devs/' + github_username)

        if (response.status===200) {            
            const devsArray = devs.filter(dev => (dev.github_username !== github_username))
            
            setDevs(devsArray)
            
        }   
    }
    
    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem onClick={handleDeleteDev} key={dev._id} dev={dev}/>
                    ))}

                </ul>
            </main>
        </div>
    )
}

export default App