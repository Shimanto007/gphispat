import React from 'react';
import styled from "styled-components";
import {Row, Col, Container} from 'react-bootstrap';
import {body_ms16} from "../../styles/globalStyleVars";
import Title from "../Title";
import ReactHtmlParser from "react-html-parser";

const ListWithGrid = ({margin, title_margin,title,product_details}) => {
    return (
        <StyledListWithGrid className="list_with_grid_section" margin={margin} title_margin={title_margin}>
            <Container>
                {
                    (() => {
                        if(title){
                            return(
                                <Row>
                                    <Col md={12}>
                                        <Title margin="0 0 40px" text={title}/>
                                    </Col>
                                </Row>
                            )
                        }else{

                        }
                    })()
                }
                <Row>
                    <Col md={12}>
                        <div>
                            <h3>{product_details?.data?.title}</h3>
                            {ReactHtmlParser(product_details?.data?.description)}
                        </div>
                    </Col>
                </Row>
            </Container>
        </StyledListWithGrid>
    );
};

const StyledListWithGrid = styled.div`
  margin: ${props => props.margin || '0'};

  h3 {
    color: rgba(34, 34, 34, 0.5);
    line-height: 30px;
    font-weight: 600;
    margin: ${props => props.title_margin || '0 0 25px'} ;
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
      .wrapper{
        border-bottom: 1px solid rgba(34, 34, 34, 0.3);
        padding-bottom: 15px;
        h4 {
          margin: 0 0 10px;
          font-weight: 500;
          color: #222222;
          ${body_ms16}
        }
      }

    }
  }

  @media(max-width: 767px){
    ul{
      li{
        flex: 0 0 100%;
        &:last-child{
          margin: 0;
        }
      }
    }

  }
`;

export default ListWithGrid;
