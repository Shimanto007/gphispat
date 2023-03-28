import React, {useEffect} from 'react';
import styled from "styled-components";
import {Container, Row, Col} from 'react-bootstrap';
import {NextSeo} from "next-seo";
import InnerBanner from "../../components/InnerBanner";
import DirectorList from "../../components/about/DirectorList";
import {useDispatch, useSelector} from "react-redux";
import {wrapper} from "../api/store";
import {ApiServices} from "../api/network/ApiServices";
import {ApiParamKey} from "../api/network/ApiParamKey";
import advisoryPanelReducer, {fetchData} from "../api/redux/about/advisory-panel";
import {PageAnimation} from "../../components/PageAnimation";
import {motion} from "framer-motion";
import {useRouter} from "next/router";
import {Loader} from "../../components/loader";


const AdvisoryPanel = (props) => {

    const getData = useSelector(state => state.advisoryPanelReducer)
    const bannerImage = getData?.data?.sections?.find(f => f?.page_data?.slug === "advisory-panel-banner");
    const advisorList = getData?.data?.sections?.find(f => f?.page_data?.slug === "advisor-panel");
    const advisorInfo = advisorList?.posts.list;


    const dispatch = useDispatch()
    const router = useRouter();


    useEffect(() => {

        if (!props.isServer) {
            let param = {
                [ApiParamKey.page_id]: '174',
                [ApiParamKey.get_section]: 'true'
            }
            let api_services = ApiServices.SECTIONS;
            dispatch(fetchData([api_services, param]))
        }
    }, [props.isServer, router])


    return (
        <>

            <StyledComponent>
                <NextSeo
                    title={`${getData?.data?.page_data?.meta_key != '' ? getData?.data?.page_data?.meta_key : 'Advisory Panel'} | GPH Ispat`}
                    description={getData?.data?.page_data?.meta_description != '' ? getData?.data?.page_data?.meta_description : ''}
                />
                {getData?.loading && <Loader/>}
                <InnerBanner title={bannerImage?.page_data?.short_desc} img={bannerImage?.images?.list[0]?.full_path}
                             subtitle={bannerImage?.page_data?.subtitle} des={bannerImage?.page_data?.description}/>
                <DirectorList background_color="#FFFFFF" title={advisorList?.page_data?.subtitle} auditCommitteeList={advisorInfo}/>

            </StyledComponent>
        </>
    );
};
const StyledComponent = styled.section`
  .directors_list_section{
    &:after{
      display: none;
    }
  }
`;
export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async ({req}) => {
        let param = {
            [ApiParamKey.page_id]: '174',
            [ApiParamKey.get_section]: 'true'
        }
        const isServer = !req.url.startsWith("/_next");

        if (isServer) {
            let api_services = ApiServices.SECTIONS;
            await store.dispatch(fetchData([api_services, param]))
        }
        return {
            props: {
                isServer,
                title: "about",
            },
        };
    })
export default AdvisoryPanel;