import React, { useEffect, useState} from 'react'
import MemePost from './MemePost';
import './Style.css';

const ListMeme = () => {
    
    const [memes, setMemes] = useState([]); 

    const getMemes = async () => {
        try {
            const response = await fetch("/memes");
            const jsonData = await response.json();
        
            setMemes(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getMemes();
    }, []);

    return (
        <div>
            <h2>Feed</h2>
            <div className = "row">
                
                {(function(){
                    if(!memes.length){
                        return <div className = "col-12 pt-5 text-center emptiness">
                            It is empty out here mate :/
                            </div>;
                    }
                })()}

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
