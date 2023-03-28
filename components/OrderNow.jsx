import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import {gradientColor, hover} from "../styles/globalStyleVars";
import {
    HideBetween,
    HideDuring,
    HideOn,
    HideScroll,
} from "react-hide-on-scroll";
const MyComponent = () => {

    return (
        <StyledComponent>
            <HideDuring inverse>
               <Link className='hover-here sticky hideDuring' href={'/product/order'}><a>Order Now </a></Link>
            </HideDuring>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 95;
  width: 145px;
  height: 53px;
  border-radius: 27px;
  overflow: hidden;

  .hideDuring {
    right: 0;
    bottom: 85vh;
  }

  .sticky {
    display: grid;
    align-content: center;
    justify-content: center;
    position: fixed;
    bottom: 0px;
    background-color: pink;
    width: 20vw;
    min-height: 10vw;
    font-weight: 900;
    font-size: 2vw;
  }
  
  
  
  &:after {
    content: '';
    position: absolute;
    height: 0;
    width: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: ${gradientColor};
    opacity: 0;
    transition: all .4s ease;
    margin: auto;
    border-radius: 27px;
  }

  a {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-transform: capitalize;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    color: #FB030C;
    border: 1px solid #FB030C;
    border-radius: 27px;
  }

  &:hover {
    &:after {
      height: 100%;
      width: 100%;
      opacity: 1;
    }

    a {
      color: #ffffff !important;
      border: 1px solid #FB030C;

    }
  }

  @media (max-width: 767px) {
    bottom: 30px;
    right: 15px;
  }

  @media (max-width: 500px) {
    width: 135px;
  }


`;

export default MyComponent;
