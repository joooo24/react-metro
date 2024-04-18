import React from 'react'
import './Footer.css';
import { FaGithub } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='footer'>
        <div className='social-networks'>
            <span>Get connected with us on social networks</span>
            <div><FaGithub className='img'/> <IoLogoInstagram className='img'/> <FaFacebookSquare className='img'/> <IoLogoYoutube className='img'/> <FaTwitter className='img'/></div>
        </div>
        
        <div className='links'>
            <ul>
                <li>Home</li>
                <li>Information</li>
                <li>Contact</li>
                <li>Products</li>
                <li>Our Team</li>
            </ul>
        </div>

        <div className='copyright'>
            © 2024 Copyright: 코딩알려주는누나 react-study-3조
        </div>
    </div>

    );
};

export default Footer