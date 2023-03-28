import React from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {fetchPostDetail} from "../../pages/api/redux/home";
import {ApiServices} from "../../pages/api/network/ApiServices";
import {ApiParamKey} from "../../pages/api/network/ApiParamKey";
import Link from 'next/link'


const Post = ({getPost}) => {
    const dispatch = useDispatch()
    let api_services = ApiServices.POSTS

    return (
        <StyeldHome>
            <div className="post-wrap">
                <h3>Posts</h3>
                {getPost?.loading ? <p>Loading posts...</p> :
                    <ul>
                        {getPost?.posts?.slice(0, 10).map(data => (
                            <li className={'this-is'} key={data?.id}>
                                <Link href={`posts/${data?.id}`}><a/></Link>
                                <h4>{data?.title}</h4>
                                <p>{data?.body}</p>
                            </li>
                        ))}

                    </ul>
                }

            </div>
        </StyeldHome>
    );
};


const StyeldHome = styled.section`
  .post-wrap {
    width: 85%;
    margin: auto;
    margin-top: 50px;

    h3 {
      margin-bottom: 50px;
    }

    h4 {
      font-weight: bold;
      font-size: 18px;
    }

    p {
      margin-top: 10px;
      font-weight: 300;
    }

    ul {
      width: 100%;
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      li {
        /*max-width: 33.333%;*/
        width: calc(33.33333% - 5px);
        padding: 10px;
        border: 1px solid #DDD;
        box-sizing: border-box;
        margin-bottom: 20px;
        position: relative;

        a {
          position: absolute;
          height: 100%;
          width: 100%;
        }
      }
    }
  }


`;

export default Post;
