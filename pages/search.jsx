import React, {useEffect} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-bootstrap";
import Link from 'next/link'
import Title from "../components/Title";
import InnerBanner from "../components/InnerBanner";
import {useRouter} from 'next/router'
import {title_ms30} from "../styles/globalStyleVars";
import {wrapper} from "./api/store";
import {ApiServices} from "./api/network/ApiServices";
import {ApiParamKey} from "./api/network/ApiParamKey";
import {fetchData} from "./api/redux/search";
// import {fetchData}
import {useDispatch, useSelector} from "react-redux";
import {Loader} from "../components/loader";
import {PageAnimation} from "../components/PageAnimation";
import {motion} from "framer-motion";

const MyComponent = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    let getSearchData = useSelector(state => state.searchReducer);


    // api call
    useEffect(() => {

        let api_services = ApiServices.SEARCH;
        let param = {
            [ApiParamKey.keyword]: router.query?.keyword,
        }
        dispatch(fetchData([api_services, param]))

    }, [router])

// data
//     const filterProduct = getSearchData?.data?.data?.filter(f => f?.type === 'product');
    const filterProduct = getSearchData?.data?.data?.slice(0, 20);


    return (
        <>
            {/*<motion.div key={`1so48`} className="page-loader" exit="exit" animate="anim"*/}
            {/*            variants={PageAnimation}*/}
            {/*            initial="init">*/}
            {/*</motion.div>*/}
            <StyledComponent className={'search pt-150 pb-150'}>
                {getSearchData?.loading && <Loader/>}
                <Container>
                    <Row>
                        <Col>
                            <Title varient={title_ms30}
                                   text={`${router.query?.keyword && router.query?.keyword !== '' ? router.query?.keyword + `(${filterProduct?.length})` : 'Search Result(0)'}`}/>
                        </Col>
                    </Row>

                    <Row className={'search__result'}>
                        <Col sm={8}>
                            <ul className={'list'}>
                                {filterProduct?.length > 0 ? filterProduct?.map(item => (
                                    <li><Link
                                        href={`${item?.type === 'product' && /product/ ||
                                        item?.slug === 'home' && '/' ||
                                        item?.parent_slug === 'media--events-parent' && '/media-events/' + item?.slug ||
                                        item?.parent_slug === 'about' && item?.title === 'Key Management Team' && '/about/management-team' ||
                                        item?.parent_slug === 'about' && item?.title === 'Directors Profile' && '/about/directors' ||
                                        item?.parent_slug === 'about' && '/about/' + item?.slug ||
                                        item?.parent_slug === 'sustinability' && item?.title === 'GPH Sustainability' && '/sustainability/' ||
                                        item?.parent_slug === 'sustinability' && '/sustainability/' + item?.slug ||
                                        item?.parent_slug === 'product--services-parent' && item?.title == 'Services' && '/product/product-services' ||
                                        item?.title === 'Product Listing' && '/product/' ||
                                        item?.parent_slug === 'product--services-parent' && '/product/' + item?.slug ||
                                        item?.parent_slug === 'career' && '/career/' + item?.slug ||
                                        item?.parent_slug === 'smarter-future' && item?.title == 'Smarter-Future-Smarter Future' && '/smarter-future' ||
                                        item?.parent_slug === 'smarter-future' && item?.title == 'Opportunity Of High-Quality Steelmaking' && '/smarter-future/opportunity-of-smart' ||
                                        item?.parent_slug === 'smarter-future' && item?.title == 'Lower Carbon Footprient' && '/smarter-future/energy-consumption' ||
                                        item?.parent_slug === 'investor-matters' && '/investor-matters/' + item?.slug ||
                                        item?.slug === 'contact' && '/contact/'
                                        }`}>
                                        <a>{item?.title}</a></Link>
                                    </li>
                                )) : <p>It seems we can’t find what you’re looking for. Perhaps searching can help.</p>}

                            </ul>
                        </Col>
                    </Row>
                </Container>
            </StyledComponent>
        </>
    );
};


const StyledComponent = styled.section`
  .search__result {
    margin-top: 80px;

    ul.list li {
      &:before {
        content: counter(count, number);
      }

      a {
        display: block;
      }
    }
  }

  @media (max-width: 767px) {
    margin-top: 80px;
    .search__result {
      margin-top: 30px;

      .col-sm-8 {
        min-width: 100%;
      }
    }
  }

`;


export default MyComponent;
