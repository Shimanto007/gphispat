import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {text, title, title_ms60} from "../styles/globalStyleVars";
import ReactHtmlParser from "react-html-parser";

const Title = ({
                   text,
                   fontSize,
                   fontWeight,
                   color,
                   letterSpacing,
                   lineHeight,
                   textTransform,
                   margin,
                   padding,
                   borderColor,
                   varient
               }) => {


    return (

        <StyledTitle className={`title fade-up`}
                     fontSize={fontSize}
                     fontWeight={fontWeight}
                     color={color}
                     lineHeight={lineHeight}
                     LetterSpacing={letterSpacing}
                     textTransform={textTransform}
                     margin={margin}
                     padding={padding}
                     varient={varient}
                     borderColor={borderColor}>
            {ReactHtmlParser(text)}
        </StyledTitle>

    )
};


const StyledTitle = styled.h2`
  ${props => props.varient ? props.varient : title_ms60};
  margin: ${props => props.margin || '0px'};
  color: ${props => props.color || text};
  font-weight: ${props => props.fontWeight || '600'};
  font-size:  ${props => props.fontSize || '40px'};
  line-height: ${props => props.lineHeight };
  position: relative;
  width: 100%;
  font-family: ${title};
  text-transform: ${props => props.textTransform || 'uppercase'};
  @media (max-width: 767px) {
    margin-bottom: 40px;
  }
`;


export default Title;














