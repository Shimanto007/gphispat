import React from 'react';
import styled from "styled-components";
import { Row, Col} from 'react-bootstrap';
import {body_ms16,title_ms30} from "../styles/globalStyleVars";
import ReactHtmlParser from "react-html-parser";

const TextList = ({text}) => {

    return (
        <StyledTextList className="plain_text">
            <Col md={12} className="fade-up" >
                {ReactHtmlParser(text)}
            </Col>
        </StyledTextList>
    );
};


const StyledTextList = styled.div`
 margin: 0px 0 60px;
  width: 100%;
  p{
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    margin: 0 0 60px;
    @media(max-width: 767px){
      margin: 0px 0 40px;


    }
  }
  ul{
    padding-left: 0;
    counter-reset: count;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 0 60px;
    li{

      position: relative;
      counter-increment: count;
      padding: 0 0px 20px 45px;
      border-bottom: 1px solid rgba(0 ,0 ,0 , 0.3);
      margin: 0 0 30px;
      flex: 0 0 calc(50% - 15px);
      &:before{
        content: counter(count, upper-alpha);
        position: absolute;
        height: 25px;
        width: 25px;
        padding: 0;
        background:linear-gradient(to bottom, rgba(173,0,0,1) 0%, rgba(255,0,0,1) 100%);
        border-radius: 50%;
        color: white;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
      }
      
    
    }
    @media(max-width: 767px){
      margin: 0 0 40px;

      li{
        flex: 0 0 100%;
        &:last-child{
          margin-bottom: 0;
        }
      }

    }
  }
`;


export default TextList;
