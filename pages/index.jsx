import Post from "../components/home/Post";
import {useDispatch, useSelector} from "react-redux";
import {ApiServices} from "./api/network/ApiServices";
import homeReducer, {fetchHome, fetchHomeProduct} from "./api/redux/home";
import {useEffect, useState} from "react";
import {wrapper} from "./api/store";
import styled from "styled-components";
import {title, title_ms12, title_ms40, title_ms60} from "../styles/globalStyleVars";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeStyle from "../styles/scrollBehavior";
import {motion} from 'framer-motion';
import "lightgallery.js/dist/css/lightgallery.css";
import BannerVideo from "../components/home/BannerVideo";
import Quantum from "../components/home/Quantum";
import FeatureProduct from "../components/home/FeatureProduct";
import Sustainability from "../components/home/Sustainability";
import NewsEventsSlider from "../components/home/NewsEventsSlider";
import WhyGph from "../components/home/whyGph";
import {ApiParamKey} from "./api/network/ApiParamKey";
// animation
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {PageAnimation} from "../components/PageAnimation";
import {fetchData, fetchPageData} from "./api/redux/mediaEvents/newsEvents";
import {Loader} from "../components/loader";

gsap.registerPlugin(ScrollTrigger);


const Home = () => {
    // animation
    ScrollTrigger.refresh();
    const dispatch = useDispatch();
    const homeData = useSelector(state => state.homeReducer);
    const newsPageData = useSelector(state => state.newsEventsReducer);
    const bannerData = homeData && homeData?.data?.sections?.find(f => f?.page_data?.slug === 'bannar');
    const quantumData = homeData && homeData?.data?.sections?.find(f => f?.page_data?.slug === 'gph-quantum');
    const whyGph = homeData && homeData?.data?.sections?.find(f => f?.page_data?.slug === 'why-gph-quantum');
    const sustainability = homeData && homeData?.data?.sections?.find(f => f?.page_data?.slug === "sustainability");
    const newsList = newsPageData?.data;

    
    // animation
    useEffect(() => {
        let allAnim = document.querySelectorAll('.fade-up');
        allAnim.forEach((el, index) => {
            gsap.fromTo(el, {
                autoAlpha: 0,
                y: 50,
                ease: "none",
            }, {
                y: 0,
                autoAlpha: 1,
                ease: "power2",
                duration: 1,
                scrollTrigger: {
                    id: `${index + 1}`,
                    trigger: el,
                    // start: 'top center+=100',
                    toggleActions: 'play none none reverse',
                }
            })
        })
    }, [homeData])

    const[fakeLoader,setFakeLoader] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setFakeLoader(false)
        }, 600)
    }, [])


    return (
        <>

            {fakeLoader && <Loader/>}
            <StyledHome className='home'>
                <HomeStyle/>
                <BannerVideo data={bannerData}/>
                <Quantum data={quantumData}/>
                <FeatureProduct data={homeData?.product}/>
                <WhyGph data={whyGph}/>
                <Sustainability data={sustainability}/>
                <NewsEventsSlider data={newsList}/>
            </StyledHome>
        </>


    )


}


const StyledHome = styled.section`
  h1 {
    font-family: ${title};
  }

  .box_global {
    min-width: 100% !important;
  }

  .asNewsOnly {
    .dc-btn {
      display: none;
    }

    @media (max-width: 767px) {
      .swiper-container {
        padding-right: 100px;
      }

      .dc-btn {
        display: block;
      }
    }
  }
`;

Home.getInitialProps = wrapper.getInitialPageProps(
    (store) =>
        async ({res}) => {
            // res?.setHeader(
            //     'Cache-Control',
            //     'public, s-maxage=2592000, stale-while-revalidate=59'
            // )
            let param = {
                [ApiParamKey.page_id]: '1',
                [ApiParamKey.get_section]: 'true'
            }
            let product_services = ApiServices.FEATURE_PROJECT;
            let api_services = ApiServices.SECTIONS
            await store.dispatch(fetchHome([api_services, param]))
            await store.dispatch(fetchHomeProduct([product_services]))

            let api_servicess = ApiServices.CHILD_PAGE_BY_ID_WITH_PAGINATION;
            let params = {
                [ApiParamKey.parent_id]: 5,
                [ApiParamKey.page_no]: 1,
                [ApiParamKey.per_page]: 5
            }
            await store.dispatch(fetchData([api_servicess, params]))
        }
);

export default Home;



