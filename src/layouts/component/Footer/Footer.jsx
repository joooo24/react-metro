import React from 'react'
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
// const navigate = useNavigate();
// const incorrect = () => {
//     navigate('/admin/incorrectInfo');
// }
  return (
    <div className='footer'>
        <div className='social-networks'>
            <span>Get connected with us on social networks</span>
            <div><FaGithub className='img'/> <IoLogoInstagram className='img'/> <FaFacebookSquare className='img'/> <IoLogoYoutube className='img'/> <FaTwitter className='img'/></div>
        </div>
        
        <div className='links'>
            <div>
                <ul>
                    <div>We are..</div>
                    <li>Home</li>
                    <li>Information</li>
                    <li>Contact</li>
                    <li>Our Team</li>
                </ul>
                <ul>
                    <div>Products</div>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>React-Router</li>
                    <li>React-Select</li>

                </ul>
            </div>
            <div>
                <ul>
                    <div>We are..</div>
                    <li>Home</li>
                    <li>Information</li>
                    <li>Contact</li>
                    <li>Our Team</li>
                </ul>
                <ul>
                    <div>Products</div>
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>React-Router</li>
                    <li>React-Select</li>
    
                </ul>
            </div>

            {/* <ul>
                <div>We are..</div>
                <li>Home</li>
                <li>Information</li>
                <li>Contact</li>
                <li>Our Team</li>
            </ul>
            <ul>
                <div>Products</div>
                <li>JavaScript</li>
                <li>React</li>
                <li>React-Router</li>
                <li>React-Select</li>

            </ul>
            <ul>
                <div>Support</div>
                <li className='incorrect-info'>
                    <Link to='/incorrectInfo'>잘못된 정보 신고</Link>
                </li>
                <li>Privacy Policy</li>
                <li>Help</li>
            </ul>
            <ul>
                <div>Manager</div>
                <li className='incorrect-info'>
                    <Link to='/admin'>Admin</Link>
                </li>
                <li>Info</li>
            </ul> */}

        </div>

        <div className='copyright'>
            © 2024 Copyright: 코딩알려주는누나 react study 3조
        </div>
    </div>

    );
};

export default Footer