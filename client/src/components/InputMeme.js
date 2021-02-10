import React from 'react';
import isImageUrl from 'is-image-url';
import './Style.css';

class InputMeme extends React.Component {
    state = {
        name: "",
        url: "",
        caption: "",
    };

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = async (e) => {
        try {
            e.preventDefault();
            if(!this.state.name || !this.state.url || !this.state.caption){
                alert("All fields are required.");
                return ;
            }
    
            if(!isImageUrl(this.state.url)){
                alert("URL is not a valid image");
                return ;
            }

            const response = await fetch("/memes",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(this.state)
            });
            console.log(response);
            this.setState({
                name: "",
                url: "",
                caption: "",
            });   
            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    };

    render() {
        return (
            <div>
                <h2>Post Meme</h2>
                <form>
                    <label className = "mt-3">Meme Owner</label>
                    <input 
                        name = "name"
                        placeholder = "What do you call yourself?"
                        className = "form-control"
                        value = {this.state.name} 
                        onChange = {e => this.change(e)}
                    /> 
                    <label className = "mt-3">Caption</label>
                    <input 
                        name = "caption"
                        placeholder = "Enter something funny maybe :3 (maximum 200 characters)"
                        className = "form-control"
                        value = {this.state.caption} 
                        onChange = {e => this.change(e)}
                    />
                    <label className = "mt-3">Meme URL</label>
                    <input 
                        name = "url"
                        placeholder = "Enter url to your meme image here"
                        className = "form-control"
                        value = {this.state.url} 
                        onChange = {e => this.change(e)}
                    /> 
                    <button 
                        className = "btn btn-danger mt-3 float-right btn-custom"
                        onClick = {(e) => this.onSubmit(e)}
                    >
                        Submit    
                    </button>
                </form>
            </div>
        );
    }
}

export default InputMeme;
