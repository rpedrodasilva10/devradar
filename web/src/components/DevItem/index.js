import React from 'react';
import './styles.css'
function DevItem({dev, onClick}) {
    
  async function handleOnClick(){
    const {github_username} = dev
    
    await onClick({
      github_username
    })

    
  }

    return (
        <li className="dev-item">
            <header>
              <img src= {dev.avatar_url} alt={dev.name}/>
              <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
              </div>
            </header>
            <button onClick={handleOnClick} className="delete-button">Excluir Dev</button>  
            <p>{dev.bio}</p>
            
            <a href={`http://github.com/${dev.github_username}`}>Acessar perfil do Github</a>
          </li>
    )
}

export default DevItem;