import React, { Component } from 'react';
import './Style.css';
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default class MemePost extends Component {
    onClick = async () => {
        try {
            const pass = window.prompt("Enter Password", "");
            if(pass !== "qwert@1234") {
                alert("Incorrect Password!");
                return ;
            }
            const response = await fetch(`http://localhost:8081/memes/${this.props.id}`, {
                method: "DELETE",
            });
            window.location = "/";
            console.log(response);
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
