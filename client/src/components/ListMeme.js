import React, { useEffect, useState} from 'react'
import MemePost from './MemePost';
import './Style.css';

const ListMeme = () => {
    
    const [memes, setMemes] = useState([]); 

    const getMemes = async () => {
        try {
            const response = await fetch("http://localhost:8081/memes");
            const jsonData = await response.json();
        
            setMemes(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getMemes();
    }, []);

    console.log(memes);
    return (
        <div>
            <h2>Feed</h2>
            <div className = "row">
                {memes.map(meme => {

                    return <MemePost 
                        key = {meme.id}
                        id = {meme.id}
                        name = {meme.name} 
                        url = {meme.url}
                        caption = {meme.caption}
                    />;
                })}
            </div>
        </div>
    )
}

export default ListMeme
