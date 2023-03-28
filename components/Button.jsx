import React, {useState, useEffect} from 'react';
import {gradient, hover} from '../styles/globalStyleVars';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';


const Button = ({
                    onSubmit,
                    text,
                    src,
                    img,
                    hoverImg,
                    fontSize,
                    fontWeight,
                    color,
                    letterSpacing,
                    lineHeight,
                    margin,
                    background,
                    borderRadius,
                    border,
                    width,
                    height,
                    hoverBackground,
                    target
                }) => {


    return (
        <StyledBtn className={`fade-up dc-btn`}
                   fontSize={fontSize}
                   fontWeight={fontWeight}
                   color={color}
                   background={background}
                   lineHeight={lineHeight}
                   letterSpacing={letterSpacing}
                   margin={margin}
                   border={border}
                   img={img}
                   borderRadius={borderRadius}
                   width={width}
                   hoverImg={hoverImg}
                   hoverBackground={hoverBackground}
                   height={height}
                   target={target}
        >
            {src ? (
                <Link href={src || '/'}>
                    <a target={target || '_self'}>
                        <span> {text}  </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="16.414"
                             viewBox="0 0 19.207 16.414">
                            <g id="Group_17192" data-name="Group 17192" transform="translate(0.5 0.707)">
                                <line id="Line_3" data-name="Line 3" x2="18" transform="translate(0 7.5)" fill="none"
                                      stroke="#fb030c" stroke-linecap="round" stroke-width="1"/>
                                <line id="Line_4" data-name="Line 4" x1="7.5" y1="7.5" transform="translate(10.5)"
                                      fill="none" stroke="#fb030c" stroke-linecap="round" stroke-width="1"/>
                                <line id="Line_5" data-name="Line 5" x1="7.5" y2="7.5" transform="translate(10.5 7.5)"
                                      fill="none" stroke="#fb030c" stroke-linecap="round" stroke-width="1"/>
                            </g>
                        </svg>

                    </a>
                </Link>
            ) : (
                <a target={target || '_self'}>
                    <span>{text}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19.207" height="16.414" viewBox="0 0 19.207 16.414">
                        <g id="Group_17192" data-name="Group 17192" transform="translate(0.5 0.707)">
                            <line id="Line_3" data-name="Line 3" x2="18" transform="translate(0 7.5)" fill="none"
                                  stroke="#fb030c" stroke-linecap="round" stroke-width="1"/>
                            <line id="Line_4" data-name="Line 4" x1="7.5" y1="7.5" transform="translate(10.5)"
                                  fill="none" stroke="#fb030c" stroke-linecap="round" stroke-width="1"/>
                            <line id="Line_5" data-name="Line 5" x1="7.5" y2="7.5" transform="translate(10.5 7.5)"
                                  fill="none" stroke="#fb030c" stroke-linecap="round" stroke-width="1"/>
                        </g>
                    </svg>

                </a>
            )}
        </StyledBtn>
    )
};

const StyledBtn = styled.div`
  &.dc-btn {
    margin: ${props => props.margin || '0'};
    width: ${props => props.width || '200'}px;
    height: ${props => props.height || '60'}px;
    cursor: pointer;

    a {
      display: flex;
      gap: 10px;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      font-size: ${props => props.fontSize || '18'}px;
      font-weight: ${props => props.fontWeight || 500};
      margin: 0;
      line-height: ${props => props.lineHeight || 27}px;
      color: ${props => props.color || `#222222`};
      text-transform: capitalize;
      border: 1px solid ${hover};
      background-color: ${props => props.background || `transparent`};
      letter-spacing: ${props => props.letterSpacing || `0`};
      position: relative;
      border-radius: ${props => props.borderRadius || '0'};
      overflow: hidden;
      z-index: 0;
      transition: border .3s ease;
      padding: 0 12%;
      box-sizing: border-box;

      span {
        transition: color .3s ease;
      }

      &:before {
        bottom: 0;
        content: "";
        display: block;
        left: auto;
        position: absolute;
        right: 0;
        top: 0;
        -webkit-transition: left 0.25s ease-in-out, right 0.25s ease-in-out, width 0.25s ease-in-out;
        transition: left 0.25s ease-in-out, right 0.25s ease-in-out, width 0.25s ease-in-out;
        width: 0;
        z-index: -1;
        ${gradient};

      }

      &:hover {
        border-color: transparent;

        span {
          color: #FFF;
        }

        svg line {
          stroke: #FFF;
        }

        &:before {
          left: 0;
          right: auto;
          width: 100%;
        }
      }

      &:focus {
        color: #222222;
      }
    }
  }

`;


export default Button;
