import React from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {fetchPostDetail} from "../../pages/api/redux/home";
import {ApiServices} from "../../pages/api/network/ApiServices";
import {ApiParamKey} from "../../pages/api/network/ApiParamKey";


const Post = ({getPost}) => {
    const dispatch = useDispatch()
    let api_services = ApiServices.POSTS

    return (
        <StyeldHome>
            <div className="post-wrap">
                <h3>Images</h3>
                {getPost?.loading ? <p>Loading posts...</p> :
                    <ul>
                        {getPost?.posts?.slice(0, 10).map(data => (
                            <li className={'this-is'} key={data?.id}>
                                <img src={data?.url} alt=""/>
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
        //cursor: pointer;

        img {
          max-width: 100%;
          object-fit: cover;
        }
      }
    }
  }


`;

export default Post;
