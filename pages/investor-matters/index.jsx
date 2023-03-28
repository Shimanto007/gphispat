import React, {useEffect} from 'react';
import styled from "styled-components";
import InvestorsMatters from "../../components/investor-matters/InvestorsMatters";
import {Col, Container, Row} from "react-bootstrap";
import Title from "../../components/Title";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {fetchData} from "../api/redux/investor-matters/index";
import {ApiParamKey} from "../api/network/ApiParamKey";
import {useDispatch, useSelector} from "react-redux";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import {NextSeo} from "next-seo";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";


const MyComponent = (props) => {

    const dispatch = useDispatch()
    const getData = useSelector(state => state.investorReducer)
    const router = useRouter();

    // api call
    useEffect(() => {
        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '114',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])

    return (
        <>

            <NextSeo
                title={`${getData?.data?.page_data?.subtitle ? getData?.data?.page_data?.subtitle : 'Financial Report' } | GPH Ispat`}
                description={getData?.data?.page_data?.meta_description !== '' ? getData?.data?.page_data?.meta_description : ''}
            />

            <StyledComponent>
                {getData?.loading && <Loader/>}

                <InvestorsMatters data={getData}/>
            </StyledComponent>
        </>
    );
};

const StyledComponent = styled.section`

`;


export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({req}) => {
            const isServer = !req.url.startsWith("/_next");

            if (isServer) {
                let param = {
                    [ApiParamKey.page_id]: '114',
                    [ApiParamKey.get_section]: 'true'
                }
                let api_services = ApiServices.SECTIONS
                await store.dispatch(fetchData([api_services, param]))
            }
            return {
                props: {
                    isServer,
                    title: "investor-matters",
                },
            };
        }
);



export default MyComponent;
