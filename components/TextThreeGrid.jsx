import React from 'react';
import styled from "styled-components";
import { Row, Col} from 'react-bootstrap';
import {body_ms16,title_ms30} from "../styles/globalStyleVars";

const TextThreeGrid = ({ text, col }) => {

    return (
        <StyledText>
            <Row className='m-0 fade-up'>
                <Col md={col}>
                    <p>{text}</p>
                </Col>

            </Row>
        </StyledText>
    );
};


const StyledText = styled.section`
  margin-bottom: 60px;
  p{
    ${title_ms30}
  }
  @media(max-width: 767px){
    margin-bottom: 40px;

  }
`;


export default TextThreeGrid;
