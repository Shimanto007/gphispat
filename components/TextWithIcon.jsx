import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import i1 from '../public/images/dynamic/i1.png';
import {title_ms20} from "../styles/globalStyleVars";
import htmlparser from "react-html-parser";



const MyComponent = ({title, img,forHome}) => {
    return (
        <StyledComponent className='text-with-icon fade-up'>
            {
                forHome?
                    <>
                        <div className='d-flex justify-content-center'>
                            <img src={img} alt=""/>
                        </div>
                        <h4 className='text-center'>{htmlparser(title) }</h4>
                    </> :
                    <>
                        <img src={img} alt=""/>
                        <h4>{htmlparser(title) }</h4>
                    </>

            }
        </StyledComponent>
    );
};

const StyledComponent = styled.div`
  img {
    margin-bottom: 20px;
    height: 60px;
    @media(min-width: 1550px){
      height: 80px;
      width: 80px;
    }
  }

  h4 {
    ${title_ms20};
    font-weight: 500;
  }
`;

export default MyComponent;
