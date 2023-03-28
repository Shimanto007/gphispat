import React from 'react';
import styled from "styled-components";
import Link from "next/link";
import {body_ms14} from "../styles/globalStyleVars";
import {text} from "../styles/globalStyleVars";

const DcLink = ({
                    text,
                    link,
                    font,
                    lineHeight,
                    textTransform,
                    color,
                    hoverColor,
                    fontWeight,
                    paddingBottom,
                    target
                }) => {
    return (
        <StyledComponent text={text} link={link} font={font} lineHeight={lineHeight} textTransform={textTransform}
                         color={color} hoverColor={hoverColor} fontWeight={fontWeight} paddingBottom={paddingBottom}
                         className='dc-link'>
            <Link href={link || '/'}>
                <a target={target}>{text}</a>
            </Link>
        </StyledComponent>
    );
};

const StyledComponent = styled.div`
  a {
    background-image: linear-gradient(currentColor, currentColor);
    background-position: 0 100%;
    background-repeat: no-repeat;
    background-size: 100% 2px;
      // padding-bottom: ${props => props.paddingBottom || '2'}px;
    padding-bottom: ${props => props.paddingBottom || '2'}px;
    text-decoration: none;
    font-size: ${props => props.font || '18'}px;
    line-height: ${props => props.lineHeight || '27'}px;
    text-transform: ${props => props.textTransform || 'capitalize'};
    color: ${props => props.color || text};
    font-weight: ${props => props.fontWeight || '500'};

    &:hover {
      color: ${text} !important;
      color: ${props => props.hoverColor || props.color} !important;
      animation: draw-line .25s ease-in-out;
    }
  }
`;

export default DcLink;
