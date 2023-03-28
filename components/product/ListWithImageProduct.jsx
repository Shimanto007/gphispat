import React from 'react';
import styled from "styled-components";
import {Row, Col, Container} from 'react-bootstrap';
import {body_ms16, body_ms18, gradient, title_ms24, title_ms30} from "../../styles/globalStyleVars";
import ListWithGrid from "./ListWithGrid";
import {Img} from "../Img";
import Button from "../Button";



const ListWithImageProduct = ({text_one, img, col, reverse, product_details , background,filterTitle,file,link}) => {
    return (
        <StyledListWithImage background={background}>

            <Container>
                <Row className={` ${reverse ? 'flex-row-reverse' : ''}`}>
                    <Col md={reverse ? {span: 5, offset: 1} : {span: 6}} className='left_col'>

                        {/*there will be no condition when data comes from api */}
                        {
                            (() => {
                                if (product_details) {
                                    return (
                                        <div>
                                            <ListWithGrid product_details={filterTitle}/>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div>
                                            <h3>Corporate History</h3>
                                            <h5>GPH ispat</h5>
                                            {/*<table>*/}
                                            {/*    <tbody>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Company Name:</td>*/}
                                            {/*        <td>GPH Ispat Limited</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Registration No:</td>*/}
                                            {/*        <td>CH-5853 of 2006</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Date of Incorporation:</td>*/}
                                            {/*        <td>May 17, 2006</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Commencement of Business:</td>*/}
                                            {/*        <td>August 21, 2008</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Conversion of Public Limited Company:</td>*/}
                                            {/*        <td>December 18, 2009</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Listed with Stock Exchanges:</td>*/}
                                            {/*        <td>December 18, 2009</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Registered Office:</td>*/}
                                            {/*        <td>Crown Chamber, 325 Asadgonj, Chattogram-4000, Bangladesh.</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Factory:</td>*/}
                                            {/*        <td>Masjiddah, Kumira, Sitakunda, Chattogram, Bangladesh.</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Factory:</td>*/}
                                            {/*        <td>Masjiddah, Kumira, Sitakunda, Chattogram, Bangladesh.</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Dhaka Office:</td>*/}
                                            {/*        <td>Hamid Tower (3rd & 11th Floor), 24 Gulshan C/A, Circle- 2,*/}
                                            {/*            Dhaka-1212.*/}
                                            {/*        </td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Phone:</td>*/}
                                            {/*        <td>+880-31-631460(PABX), +880-31-2854997</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>Fax:</td>*/}
                                            {/*        <td>+880-31-610995</td>*/}
                                            {/*    </tr>*/}
                                            {/*    </tbody>*/}
                                            {/*</table>*/}
                                        </div>

                                    )
                                }

                            })()
                        }

                    </Col>
                    <Col md={reverse ? {span: 6} : {span: 5, offset: 1}} className='right_col'>
                        <div className='right_col_image_wrapper'>
                            <Img src={img} alt=""/>
                        </div>
                        {
                            (() => {
                                if (product_details) {
                                    return (
                                        <div className="gph_no_icon_btn">
                                            <Button
                                                src={`${file}`}
                                                target={'_blank'}
                                                text={'Download our technical Document'}
                                                background={'#E9E9E9'}

                                            />
                                            <Button text={'Steel processes'}  src={`/${link}`} background={'#E9E9E9'}/>

                                        </div>
                                    )
                                }

                            })()
                        }

                    </Col>
                </Row>
            </Container>
        </StyledListWithImage>
    );
};
const StyledListWithImage = styled.section`
  background: ${props => props.background || "#F9F9F9"} ;
  position: relative;


  .flex-row-reverse {


    .right_col {
      padding-left: 15px;

      .right_col_image_wrapper {
        position: relative;
        padding-top: calc(350 / 570 * 100%);
      }
    }
  }

  .left_col {
    p {
      font-weight: 400;

      ${body_ms18}
      span {
        color: #FB030C;
      }

      b {
        font-size: 20px;
        font-weight: 500;
        line-height: 30px;
      }
    }

    h3 {
      font-weight: 500;
      line-height: 40px;
      color: #222222;
      text-transform: uppercase;
      margin: 0 0 60px;
      ${title_ms30}
    }

    h5 {
      font-size: 20px;
      line-height: 20px;
      font-weight: 600;
      color: rgba(34, 34, 34, 0.5);
      margin: 0 0 25px;
      text-transform: uppercase;
    }

    table {
      tr {
        display: flex;
        width: 100%;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }

        td {
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(34, 34, 34, 0.3);
          color: #222222;
          font-weight: 400;
          flex: 0 0 65%;
          padding-left: 30px;

          ${body_ms16}
          &:first-child {
            font-weight: 500;
            flex: 0 0 35%;
            padding-left: 0px;
          }


        }
      }
    }
  }

  .right_col {


    .right_col_image_wrapper {
      position: relative;
      padding-top: calc(500 / 500 * 100%);

      svg {
        position: absolute;
        top: -50px;
        right: -20px;
        @media (max-width: 767px) {

          top: -40px;
          right: -20px;
          height: 60px;

        }
      }

      .content {
        background: linear-gradient(120deg, rgba(173, 0, 0, 1) 0%, rgba(255, 0, 0, 1) 100%);
        position: absolute;
        z-index: 1;
        left: -30px;
        bottom: 30px;
        padding: 30px;
        width: 100%;

        h5 {
          font-weight: 600;
          margin: 0 0 10px;
          color: #FFFFFF;
          ${title_ms24}
        }

        p {
          font-weight: 400;
          color: #FFFFFF;
          ${body_ms18}
        }

        @media (max-width: 767px) {
          left: 0;
          bottom: 0;
          padding: 20px 30px;
        }
      }
    }

    &.default_padding {
      padding-left: 15px;
    }


  }

  .director_message {
    .right_col {
      padding-left: 100px;
    }

    .right_col_image_wrapper {
      position: relative;
      padding-top: calc(550 / 470 * 100%);
    }
  }

  .gph_no_icon_btn {

    .dc-btn {
      svg {
        display: none;
      }

      width: 100%;

      margin-top: 40px;

      &:last-child {
        a {
          border-color: #FB030C;
          background: transparent;
          justify-content: center;

          span {
            color: #FB030C;
          }

          &:hover {
            span {
              color: white;
            }
          }
        }
      }

      a {
        ${gradient};
        padding: 0;
        justify-content: center;

        span {
          color: white;
          text-transform: uppercase;
        }

        &:before {
          //background: linear-gradient(135deg,rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.05) 100%);;
        }
      }
    }
  }

  @media (max-width: 767px) {
    .flex-row-reverse {
      flex-direction: column-reverse !important;
    }

    .row {
      flex-direction: column;

      .right_col {
        .right_col_image_wrapper {
          margin-top: 40px;
        }
      }
    }

    .director_message {
      .right_col {
        padding-left: 15px;
      }

    }
  }
`;
export default ListWithImageProduct;