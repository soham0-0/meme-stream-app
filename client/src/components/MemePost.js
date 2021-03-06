import React, { Component, Fragment } from 'react';
import InputMeme from './InputMeme.js'
import './Style.css';

// Icons
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiFillCloseSquare } from "react-icons/ai";

// Lazy Loading
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; 

export default class MemePost extends Component {
    onClick = async () => {
        try {
            const pass = window.prompt("Enter Password", "");
            
            // Checking if a password was entered or not
            if(!pass) {
                return;
            }

            // Requesting Delete
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
                    <div className = "head">
                        <FaUserCircle className = "middle"/>
                        <div className = "middle name">{this.props.name}</div>
                        <Fragment>
                            <FaEdit className = "middle cursor" data-toggle="modal" data-target={`#myModal${this.props.id}`}/>
                            
                            <div className="modal" id = {`myModal${this.props.id}`}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                
                                        <div className="modal-header">
                                        <h2 className = "modal-title">Edit The Meme</h2>
                                        <button type="button" className="close" data-dismiss="modal">
                                        <AiFillCloseSquare style = {{verticalAlign: "middle"}}/></button>
                                        </div>
                                
                                        <div className="modal-body">
                                            <InputMeme name = {this.props.name} id = {this.props.id} url = {this.props.url} caption = {this.props.caption}/>
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                        <MdDelete onClick = {() => this.onClick()} className = "middle cursor"/>
                    </div>
                    <div className = "imgwrapper">
                        <LazyLoadImage
                            className = "img" 
                            src = {this.props.url}
                            alt = {"✘ Image couldn't be loaded"}
                        />
                    </div>
                    <p className = "text-justify scrollable">
                        {this.props.caption}
                    </p>
                </div>
            </div>
        )
    }
}
