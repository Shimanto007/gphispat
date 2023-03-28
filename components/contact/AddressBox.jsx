import React, {useState, useRef, useEffect} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from 'react-bootstrap';
import {body_ms14, body_ms18, gradientColor, title_ms20, title_ms30, title_ms60} from "../../styles/globalStyleVars";
import ReactHtmlParser from "react-html-parser";
import {Img} from "../Img";
import directors_img from "../../public/images/dynamic/about/dm.jpg";
import chairman from "../../public/images/dynamic/about/chairman.png";
import md from "../../public/images/dynamic/about/md.png";
import Title from "../Title";
import Button from 'react-bootstrap/Button';
import Popup from '../Popup';


const AddressBox = ({bgColor, title, data, phone}) => {

    return (
        <StyledAddressBox
            bgColor={bgColor}
            className={'addressBox fade-up'}
        >
            <Title varient={title_ms20} text={title} margin={"0 0 20px 0"} fontSize={'20px'} lineHeight={'24px'}/>
            {data}

            <div className="ctaButton">
                <a href={'tel:'+ phone} target={'_self'}>
                    <svg  width="25" height="25" viewBox="0 0 20 20">

                        <defs>
                            <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                                <stop offset="0" className="stop1" stop-color="#ad0000"/>
                                <stop offset="1" stop-color="red" className="stop2"/>
                            </linearGradient>
                            <clipPath id="clip-path">
                                <rect id="Rectangle_5406" data-name="Rectangle 5406" width="15" height="15" transform="translate(2978.5 12391.5)" fill="url(#linear-gradient)"/>
                            </clipPath>

                        </defs>
                        <g id="Group_18481" data-name="Group 18481" transform="translate(-138 -987)">
                            <g id="Group_17929" data-name="Group 17929" transform="translate(-2838 -11364)">
                                <rect id="Rectangle_5400" data-name="Rectangle 5400" width="20" height="20" transform="translate(2976 12351)" opacity="0" fill="url(#linear-gradient)"/>
                                <g id="Mask_Group_496" data-name="Mask Group 496" transform="translate(0 -38)" clip-path="url(#clip-path)">
                                    <path id="_004-telephone" data-name="004-telephone" d="M14.566,11.316,12.277,9.271A1.3,1.3,0,0,0,10.6,9.224l-.931.744a.819.819,0,0,1-.967.051A12.336,12.336,0,0,1,6.618,8.382,12.336,12.336,0,0,1,4.981,6.3a.819.819,0,0,1,.051-.967L5.776,4.4a1.3,1.3,0,0,0-.047-1.674L3.684.434A1.3,1.3,0,0,0,1.781.4L.65,1.566h0C-.209,2.455-.217,3.9.627,5.73A18.278,18.278,0,0,0,4.29,10.709a18.279,18.279,0,0,0,4.979,3.664A5.936,5.936,0,0,0,11.687,15a2.419,2.419,0,0,0,1.747-.65l1.17-1.131a1.3,1.3,0,0,0-.037-1.9Zm-.288,1.565-1.17,1.131c-.933.9-2.5.462-3.643-.065a17.806,17.806,0,0,1-4.843-3.57A17.806,17.806,0,0,1,1.052,5.535C.525,4.388.086,2.825.987,1.892L2.118.722A.83.83,0,0,1,3.334.746L5.379,3.035a.828.828,0,0,1,.03,1.07l-.743.93a1.282,1.282,0,0,0-.08,1.513,12.8,12.8,0,0,0,1.7,2.165,12.8,12.8,0,0,0,2.165,1.7,1.282,1.282,0,0,0,1.513-.08l.93-.743a.828.828,0,0,1,1.07.03l2.289,2.044a.83.83,0,0,1,.024,1.216ZM2.171,5.42a.234.234,0,1,1-.418.213c-.4-.778-.991-2.212-.533-3.072a1.158,1.158,0,0,1,.19-.26.234.234,0,0,1,.337.326.679.679,0,0,0-.113.155C1.252,3.5,1.948,4.982,2.171,5.42Z" transform="translate(2978.5 12391.5)" fill="url(#linear-gradient)"/>
                                </g>
                            </g>
                        </g>
                    </svg>

                    <span>{phone}</span>
                </a>
            </div>
        </StyledAddressBox>
    );
};


const StyledAddressBox = styled.div`
  padding: 30px 30px 0 30px;
  background-color: ${props => props.bgColor || '#ffffff'};
  margin-bottom: 30px;
  position: relative;
  table{
    ${body_ms14};
    margin-bottom: 30px;
    th{
      font-weight: 400;
      padding-left: 0;
    }
    th, td{
      padding-top: 0;
      padding-bottom: 15px;
    }
    tr{
      &:last-child{
        th, td{
          padding-bottom: 0;
        }
      }
    }
  }
  .ctaButton{
    position: relative;
    text-align: center;
    &:before{
      content: '';
      position: absolute;
      left: -30px;
      right: -30px;
      height: 1px;
      background-color: #DDDDDD;
    }
    a{
      padding-top: 30px;
      padding-bottom: 30px;
      display: block;
      position: relative;
      svg, span{
        position: relative;
        z-index: 1;
      }
      svg{
        margin-right: 15px;
      }
      span{
        ${body_ms14};
        font-weight: 400;
        color: #FB030C;
        transition: all .6s ease;
      }
      &:before{
        position: absolute;
        content: "";
        left: -30px;
        right: -30px;
        top: 0;
        width: 0;
        height: 100%;
        background-color: #222222;
        transition: all .6s ease;
      }
      &:hover{
        &:before{
          width: calc(100% + 60px);
        }
        svg{
          path{
            fill: #ffffff;
          }
        }
        span{
          color: #ffffff;
        }
      }
    }
  }

  @media(max-width: 992px) {
    #_004-telephone{
      fill: red;
    }
  }
  
  @media(max-width: 992px) and (min-width: 768px){
    ul{
      li{
        flex-direction: column;
        p{
          &:first-child{
            margin: 0 0 10px;
          }
        }
      }
    }
  }
`;


export default AddressBox;
