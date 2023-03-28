import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import {Img} from "./Img";
import DcLink from "./Link";
import {body_ms14, gradientColor, title_ms20} from "../styles/globalStyleVars";
import reactHtmlParser from 'react-html-parser';

const MyComponent = ({src, text, img, title}) => {
    return (
        <StyledComponent className='product'>
            <div className="product__img">
                <Link href={src}><a/></Link>
                <Img src={img}/>
            </div>
            <div className="product__content">
                <h4>{title}</h4>
                <p>{reactHtmlParser(text)}</p>
                <DcLink link={src} text={'Learn more'}/>
            </div>
        </StyledComponent>
    );
};

const StyledComponent = styled.div`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 2px;
    background: ${gradientColor};
    left: 0;
    width: 0;
    transition: width .4s ease-out;
  }

  .product__img {
    padding-top: calc(300 / 370 * 100%);
    position: relative;
    overflow: hidden;

    img {
      transition: transform 1.4s ease;
      transform: scale(1.01);
    }

    a {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
    }
  }

  .product__content {
    padding: 25px 40px 30px 40px;
    background-color: #fff;

    h4 {
      ${title_ms20};
      margin-bottom: 10px;
      font-weight: 500;
    }

    p {
      ${body_ms14};
      margin-bottom: 20px;
    }

    @media (min-width: 1550px) {
      padding: 30px 40px 30px !important;
    }
    @media (max-width: 776px) {
      padding: 30px 20px 30px !important;
    }
  }

  &:hover {
    &:after {
      width: 100%;
    }

    .product__img {
      img {
        transform: scale(1.04);
      }
    }
  }
`;

export default MyComponent;
