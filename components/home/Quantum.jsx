import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import {Img} from "../Img";
import Title from "../Title";
import quantumLogo from '../../public/images/static/quantum.png';
import quantumLogo_mobile from '../../public/images/static/gph_mobile.png';
import img from '../../public/images/dynamic/i1.png';
import img_two from '../../public/images/dynamic/i2.png';
import img_three from '../../public/images/dynamic/i3.png';
import Quantum from "./Quantum";
import TextWithIcon from "../TextWithIcon";
import Button from "../Button";
import htmlparser from "react-html-parser";

const MyComponent = ({data}) => {

    let [image, setImage] = useState(quantumLogo);
    // change the image src from here only for mobile
    // {data?.images?.list?.length > 0 && data?.images?.list?.map(item => (
    //
    // ))}

    useEffect(() => {
        let Window_Width = window.innerWidth;

        if (Window_Width < 767) {
            setImage(quantumLogo_mobile)
        }
    }, []);

    return (
        <StyledComponent className='pt-150 pb-150 quantum' id={'to-here'}>
            <Container>
                <Row>
                    <Col sm={4}>
                        <div className="quantum__img fade-up">
                            <Img src={image}/>
                        </div>
                    </Col>

                    <Col sm={{span: 6, offset: 2}} className='quantum__content'>
                        <Title margin={'0 0 60px 0'} text={data?.page_data?.subtitle}/>
                        <p className={'fade-up'}>{data?.page_data?.short_desc}</p>
                        <div className="quantum__content__icon d-flex">
                            {data?.images?.list?.length > 0 && data?.images?.list?.map(item => (
                                <Col sm={4}>
                                    <TextWithIcon title={item?.short_title} img={item?.full_path} forHome/>
                                </Col>
                            ))}
                        </div>

                        <Button text={'Explore'} src={'/product/quantum-eaf'} margin={'40px 0 0 0'}/>

                    </Col>
                </Row>

            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
  .quantum__img {
    padding-top: calc(454 / 402 * 100%);
    position: relative;
  }

  .quantum__content {
    &__icon {
      margin-top: 40px;

      .col-sm-4 {
        &:nth-of-type(1) {
          padding-left: 0;
        }
      }
    }
  }

  @media (min-width: 1550px) {
    .quantum__content__icon {
      margin-top: 60px;
    }

    .dc-btn {
      margin-top: 60px;
    }
  }

  @media (max-width: 991px) {
    .col-sm-5, .col-sm-6 {
      min-width: 100%;
      margin: 0;
    }
  }
  @media (max-width: 991px) {
    .quantum__content__icon .col-sm-4 {
      min-width: 50%;

      &:nth-of-type(n+3) {
        display: none;
      }
    }
  }

`;

export default MyComponent;
