import React from 'react';
import styled from "styled-components";
import {Col, Container, Row} from 'react-bootstrap';
import {body_ms16} from "../styles/globalStyleVars";
import Title from "./Title";
import ReactHtmlParser from "react-html-parser";
import {Img} from "./Img";

const ListWithGrid = ({margin, title_margin, title, col, product_details, getQualityTestData, directorList}) => {

    const postOne = getQualityTestData?.posts;


    const qualityTestShortDes = getQualityTestData?.page_data?.short_desc;
    return (
        <StyledListWithGrid className="list_with_grid_section fade-up" margin={margin} title_margin={title_margin}>
            <Container>
                {
                    (() => {
                        if (title) {
                            return (
                                <Row>
                                    <Col md={12}>
                                        <Title margin="0 0 40px" text={title}/>
                                    </Col>
                                </Row>
                            )
                        } else {

                        }
                    })()
                }

                <Row>
                    <Col md={12}>
                        {
                            (() => {
                                if (product_details) {
                                    return (
                                        <div>
                                            <h3>{qualityTestShortDes}</h3>

                                            {
                                                getQualityTestData?.posts?.list?.map(data => (
                                                    <>
                                                        <h4 key={data?.data?.id}>{data?.data?.sub_title}</h4>
                                                        {ReactHtmlParser(data?.data?.description)}
                                                    </>

                                                ))}


                                        </div>
                                    )
                                } else {
                                    return (
                                        <div>
                                            <h4>{directorList?.page_data?.subtitle}</h4>
                                            <ul>
                                                {
                                                    directorList.posts?.list && directorList?.posts?.list?.length>0 &&
                                                    directorList?.posts?.list?.map((element) =>{
                                                        return(
                                                            <li  key={element?.data?.id}>
                                                                <div className="wrapper">
                                                                    <h4>{element?.data?.subtitle}</h4>
                                                                    <p>{element?.data?.short_desc}</p>
                                                                </div>
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </div>

                                    )
                                }
                            })()
                        }

                    </Col>
                </Row>
            </Container>
        </StyledListWithGrid>
    );
};

const StyledListWithGrid = styled.div`
  margin: ${props => props.margin || '0'};

  h4 {
    color: rgba(34, 34, 34, 0.5);
    line-height: 30px;
    font-weight: 600;
    margin: ${props => props.title_margin || '0 0 25px'};
    font-size: 20px;
    text-transform: uppercase;
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 -15px;

    li {
      flex: 0 0 33.333333%;
      padding: 0 15px;
      margin-bottom: 20px;
      height: 100%;

      .wrapper {
        border-bottom: 1px solid rgba(34, 34, 34, 0.3);
        padding-bottom: 15px;
        height: 100%;

        h4 {
          margin: 0 0 10px;
          font-weight: 500;
          color: #222222;
          ${body_ms16}
        }

        p {
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          color: #222222;
        }
      }

      &:last-child {
        margin: 0;
      }
    }
  }

  @media (max-width: 767px) {
    ul {
      li {
        flex: 0 0 100%;

        &:last-child {
          margin: 0;
        }
      }
    }

  }
`;

export default ListWithGrid;
