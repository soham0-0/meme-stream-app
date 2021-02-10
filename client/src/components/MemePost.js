import React, { Component } from 'react';
import './Style.css';
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default class MemePost extends Component {
    onClick = async () => {
        try {
            const pass = window.prompt("Enter Password", "");
            
            if(!pass) {
                return;
            }

            const response = await fetch(`/memes/${this.props.id}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"pass": pass})
            });
            
            if(response.status === 401) {
                alert("Incorrect password");
                return ;
            }

            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    }
    render() {
        return (
            <div className = "col-xs-12 col-sm-12 col-md-6 col-lg-3">
                <div className = "post">
                    <div className = "name">
                        <FaUserCircle className = "middle"/>
                        <span className = "middle">{this.props.name}</span>
                        <FaEdit className = "middle float-right cursor"/>
                        <MdDelete onClick = {() => this.onClick()} className = "middle float-right cursor"/>
                    </div>
                    <div 
                        className = "img" 
                        style = {{
                            backgroundImage: `url(${this.props.url})`
                        }}
                    />
                    <div className = "container text-justify scrollable">
                        {this.props.caption}
                    </div>
                </div>
            </div>
        )
    }
}
