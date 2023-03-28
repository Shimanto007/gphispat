import React from 'react';
import styled from "styled-components";
import { Row, Col} from 'react-bootstrap';
import {body_ms16,title_ms30} from "../styles/globalStyleVars";

const SubTitle = ({ text, col ,margin }) => {

    return (
        <StyledText margin={margin} className="subtitle fade-up">
            <Row className=''>
                <Col md={col}>
                    <p>{text}</p>
                </Col>

            </Row>
        </StyledText>
    );
};


const StyledText = styled.section`
  margin: ${props => props.margin || '0 0 60px'};
  p{
    font-weight: 500;
    ${title_ms30}
  }
  @media(max-width: 767px){
    margin-bottom: 40px;

  }
`;


export default SubTitle;
