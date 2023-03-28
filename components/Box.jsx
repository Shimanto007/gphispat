import React, {useState} from 'react';
import styled from 'styled-components';
import {body_ms18, title_ms24} from "../styles/globalStyleVars";
import ReactHtmlParser from "react-html-parser";
import Link from '../components/Link'
import Popup from "./Popup";

const Box = ({title, text, slider, learn_more}) => {

    const [show, setShow] = useState(false);
    const [BgHeight, setBgHeight] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <StyledBox className={`box_global`}>
            <div className={'box_wrp'}     onClick={learn_more?.data?.description ? handleShow : null}  >
                <div className="box_global_single">
                    <div className="content">
                        <h4>{ReactHtmlParser(title)}</h4>
                        <p>{ReactHtmlParser(text)}</p>
                    </div>
                    <div onClick={handleShow}>
                        {
                            (() => {
                                if (learn_more?.data?.description) {
                                    return (<Link link={'javascript:void(0)'} text="Learn more"/>
                                    )
                                }
                            })()
                        }

                    </div>

                </div>
            </div>

            <Popup slider item={learn_more} show={show} handleClose={handleClose}/>

        </StyledBox>

    )
};


const StyledBox = styled.div`
  height: 100%;
  .box_wrp{
    height: 100%;
  }
  .box_global_single{
    padding:40px 30px;
    border: 1px solid #FFFFFF;
    cursor: pointer;
    transition: 0.7s all linear;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    transition-delay: 0.7s;
    &:before{
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 0;
      background-image: linear-gradient(135deg, rgba(255 ,255 ,255 , 0.4) 0%, rgba(255 ,255, 255 , 0.05)100%);
      backdrop-filter: brightness(100%) blur(30px);
      opacity: 1;
      transition: 0.7s all ease;

    }
    &:after{
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 0;
      background: linear-gradient(135deg, rgba(255,0,0,0.35) 0%, rgba(255,8,8,0.65) 100%);
      backdrop-filter: brightness(100%) blur(30px);
      opacity: 0;
      transition: 0.7s all ease;

    }
    .content{
      position: relative;
      z-index: 2;
      h4{
        font-weight: 500;
        color: white;
        ${title_ms24};
        margin: 0 0 30px;
       @media(min-width: 1550px){
         margin: 0 0 40px;

       }

      }
      p{
        font-weight: 400;
        color: #FFFFFF;
        ${body_ms18};
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
    .dc-link{
      z-index: 2;
      position: relative;
      margin: 70px 0  0;
      display: inline-block;
      ${body_ms18};
    
      @media(min-width: 1550px){
        margin: 100px 0 0;
      }
      a{
        color: #FFFFFF;

        &:after{
          background: #FFFFFF;
        }
        &:hover{
          color: #FFFFFF !important;
        }
      }
    }
    &:hover{
      //transition: 0.7s all ease;


    }
  }
  .box_wrp:hover{
    .box_global_single{
      //background-image: -webkit-linear-gradient(135deg, rgba(255,0,0,0.35) 0%, rgba(255,8,8,0.65) 100%);
      background-image: unset;
      &:after{
        opacity: 1;
      }
      &:before{
        opacity: 0;
      }
    }
  }
  margin-bottom: 30px;
  @media(max-width: 1200px) and (min-width: 768px){
    //max-width: 50%;
    //flex: 0 0 50%;
  }
  @media(max-width: 767px){
    min-height: unset;
    .box_global_single{
      display: block;
    }
  }
  
`;


export default Box;