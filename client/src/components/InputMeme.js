import React from 'react';
import {MdFileUpload} from 'react-icons/md';
import './Style.css';

class InputMeme extends React.Component {
    state = {
        name: "",
        url: "",
        caption: "",
        isEdit: false
    };  

    change = (e) => {
        if(this.state.isEdit && e.target.name === "name") {
            return ;
        }
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onSubmit = async (e) => {
        try {
            e.preventDefault();
            if(!this.state.isEdit && (!this.state.name || !this.state.url || !this.state.caption)){
                alert("All fields are required.");
                return ;
            }

            let response;
            if(this.state.isEdit){
                // Patching the meme
                response = await fetch(`/memes/${this.props.id}`,{
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "url": this.state.url,
                        "caption":  this.state.caption
                    })
                });
            } else {
                response = await fetch("/memes",{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "name": this.state.name,
                        "url": this.state.url,
                        "caption":  this.state.caption
                    })
                });
            }
    
            if(response.status === 400){
                alert("URL is not a valid image");
                return ;
            }

            this.setState({
                name: "",
                url: "",
                caption: "",
                isEdit: false
            });   
            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    };

    componentDidMount = () => {
        if(this.props.id && !this.state.isEdit){
            this.setState({
                ...this.props, 
                isEdit: true
            });
        }
    }

    render() {
        return (
            <div>
                <form>
                    {(function(isPost) {
                        if(!isPost) {
                            return <h2>Post A Meme</h2>;
                        }
                    })(this.state.isEdit)}
                    <label className = "mt-3">Meme Owner</label>
                    <input 
                        name = "name"
                        placeholder = "What do you call yourself?"
                        className = "form-control"
                        autoComplete = "off"
                        value = {this.state.name} 
                        onChange = {e => this.change(e)}
                    /> 
                    <label className = "mt-3">Caption</label>
                    <input 
                        name = "caption"
                        placeholder = "Enter something funny maybe :3 (maximum 200 characters)"
                        className = "form-control"
                        autoComplete = "off"
                        value = {this.state.caption} 
                        onChange = {e => this.change(e)}
                    />
                    <label className = "mt-3">Meme URL</label>
                    <input 
                        name = "url"
                        placeholder = "Enter url to your meme image here"
                        className = "form-control"
                        autoComplete = "off"
                        value = {this.state.url} 
                        onChange = {e => this.change(e)}
                    /> 
                    <button 
                        className = "btn btn-danger mt-4 float-right btn-custom"
                        onClick = {(e) => this.onSubmit(e)}
                    >
                        <MdFileUpload style = {{verticalAlign: "middle"}}/>  
                        <span className = "submit">Submit</span>    
                    </button>
                </form>
            </div>
        );
    }
}

export default InputMeme;
