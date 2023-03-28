import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from '../components/Link';
import NextLink from "next/link";
import {Img} from "./Img";

import {body_ms14, body_ms18, title_ms12} from "../styles/globalStyleVars";
import {title} from '../styles/globalStyleVars';
import moment from "moment";


const MyComponent = ({src, data}) => {


    return (
        <StyledComponent className=''>
            <NextLink href={"/media-events/" + data?.slug + '?press=true'}>
                <a>
                    <div className='presslist__single'>
                        <div className='presslist__single__img'>
                            <Img src={src}/>
                        </div>
                        <div className='presslist__single__content'>
                            <h2>{moment(Date(data?.year)).format('DD MMMM YYYY')}</h2>
                            <div className='presslist__single__content__text'>
                                <p>{data?.title} </p>
                            </div>
                            <div className='presslist__single__content__link'>
                                <Link paddingBottom={'0'} text={'Learn more'} link={"/media-events/" + data?.slug}
                                      font={'14'}/>
                            </div>
                        </div>
                    </div>
                </a>
            </NextLink>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  .presslist {
    &__single {
      margin-bottom: 30px;
      //box-sizing: border-box;
      transition: 1s ease-in-out;
      -webkit-transition: all 0.2s ease-in-out;
      border: 1px solid transparent;

      &:hover {
        //outline: auto;
        //outline-color:  #EE1B24;
        border: 1px solid #EE1B24;
        transition: 1s ease-in-out;
        -webkit-transition: all 0.2s ease-in-out;
        box-shadow: 0 5px 30px rgba(238, 27, 36, 0.08);
        border-radius: unset;

      }

      &__img {
        position: relative;
        padding-top: calc(250 / 370 * 100%);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

      }

      &__content {
        padding-top: 27px;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 31px;
        position: relative;
        background-color: #FFFFFF;
        @media (max-width: 992px) {
          font-size: 18px;
          line-height: 27px;
        };

        &__text {
          min-height: 135px;
        }

        &__link {
          position: absolute;
          bottom: 31px;
        }

        h2 {
          ${title_ms12};
          margin-bottom: 20px;
          color: #FB030C;
          font-weight: 500;
        }

        p {
          ${body_ms18};
          color: #222222;
          margin-bottom: 30px;
          //height: 80px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 400;
          font-family: ${title};

        }

        &__learn {
          position: relative;

          &:after {
            content: '';
            height: 3px;
            width: 0px;
            background-image: linear-gradient(#AD0000, #FF0000);
            position: absolute;
            transition: .3s;
          }

          h2 {
            ${body_ms14};
            color: #222222;
            font-weight: 500;
            font-family: ${title};
            cursor: pointer;
            border-bottom: 2px solid #222222;
            width: 26%;
          }
        }

      }

      @media (max-width: 767px) {
        margin-bottom: 20px !important;
        :last-child {
          margin-bottom: 0px;
        }
      }

    }
  }
`;

export default MyComponent;
