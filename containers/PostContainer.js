import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {compose} from 'redux';
import { connect } from 'react-redux';

import {getApi, cancelToken} from '../redux/api/action';

import { WordPressClass } from '../builder/containers/WordPressPostsContainer';

const PostContainer = (Comp, rest={}) => class extends WordPressClass {

  //getPostById

        componentDidMount() {
          const {id} = this.props;
          
          const postIndex = this.findPostIndex({id});

          //post not found in store, will attempt to download it
          if(postIndex === -1){
            this.fetchPosts({id}).then(res=>console.log('done fetching post id: ', id));
          }


        }


        render() {

          const {id} = this.props;
          
          //const allData = posts ? posts.data : [];

          //const index = allData.findIndex(post=>post.id === id);
          
          //const post = index > -1 ? allData[index] : {};

          //console.log('post ', index)

          const data = this.getSinglePost({id});

          const post = data ? this.preparePost(data) : {};

          var args = {id, post};

        return (
            <Comp {...args} />
        )
        }

    }


  const mapStateToProps = state => {

    const appIndex =  state.globalState.currentApp || 0;
      
        return ({
            url: state.globalState.url,
            posts:state.api[`posts-${appIndex}`],
  //          categories:state.api[`categories-${appIndex}`], 
  //          gState:state.globalState, 
            appIndex
    
      });
    };


//

export default compose(
    connect(mapStateToProps, {getApi, cancelToken}),
    PostContainer
  );