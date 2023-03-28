import {Provider} from 'react-redux';
import {useEffect} from "react";
import store from './api/store'
import {wrapper} from "./api/store";
import Menu from "../components/Menu";
import GlobalStyle from "../styles/globalStyle";
import {DefaultSeo} from "next-seo";
import SEO from '../next-seo.config';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/Footer";
import {ParallaxProvider} from "react-scroll-parallax";
import OrderNow from "../components/OrderNow";
import {CSSPlugin, gsap, TimelineLite} from "gsap";
import {useRouter} from "next/router";
import {AnimatePresence} from "framer-motion";


function MyApp({Component, pageProps}) {

    const router = useRouter();

    useEffect(() => {

        if (router.pathname === '/search' || router.pathname === '/product/[slug]' || router.pathname === '/product/order' || router.pathname === '/media-events/[slug]' || router.pathname === '/career/[slug]') {
            document.body.classList.add('second-menu')
        } else {
            document.body.classList.remove('second-menu')
        }

    }, [router])

    useEffect(() => {

        if (router.pathname === '/') {
            document.body.classList.add('in-home')
        } else {
            document.body.classList.remove('in-home')
        }
    }, [router])


    wrapper.getInitialAppProps(
        (store) =>
            async ({Component, ctx}) => {
                // Wait for all page actions to dispatch
                const pageProps = {
                    ...(Component.getInitialProps
                        ? await Component.getInitialProps({...ctx, store})
                        : {}),
                };

                // 2.1 Stop if on server
                if ((ctx.req) && Component.getInitialProps) {
                    // store.dispatch(END)
                    // used in hydration reducer
                    store.dispatch({type: SET_IS_SERVER})
                }

                // getServerSideProps is used
                const isServer = !ctx.req?.url?.startsWith("/_next");
                if (isServer && !Component.getInitialProps) {
                    // used in hydration reducer
                    store.dispatch({type: SET_IS_SERVER});
                }

                // 3. Return props
                return {
                    pageProps,
                };
            }
    );

    return (

        <>
            <DefaultSeo {...SEO}/>
            <GlobalStyle/>
            <Menu/>
            <ParallaxProvider>
                <AnimatePresence exitBeforeEnter>
                    <Component key={router?.pathname} {...pageProps} />
                    <OrderNow/>
                </AnimatePresence>
                <Footer/>
            </ParallaxProvider>
        </>

    )
}

export default wrapper.withRedux(MyApp)
