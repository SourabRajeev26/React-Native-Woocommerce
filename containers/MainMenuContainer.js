import React from 'react';
//import PropTypes from 'prop-types';
import {compose} from 'redux';
import { connect } from 'react-redux';
//import HomeContainer from './HomeContainer';
import {getApi, cancelToken} from '../redux/api/action';
//import NavigationService from '../navigation/NavigationService.js';
//import purgeHtml from '../builder/containers/_purgeHtml';
import { WordPressClass } from '../builder/containers/WordPressPostsContainer';
import * as dotProp from '../builder/containers/_dotProp';

const MainMenuContainer = (Comp, rest={}) => class extends WordPressClass {


  offset=0;
  per_page=50;
  categories=0;
  //author=0;
  search='';
  orderby='count';
  order='desc';
  status='publish';
  hide_empty=true


  constructor(props){

    super(props);

    this.state = {
        
    }
   
    //desc, asc |author, date, id, include, modified, parent, relevance, slug, title
   //this.fetchMore = this.fetchMore.bind(this);


  }

  getAppMenu(target="main_menu"){
    
    const {currentApp, apps} = this.props.gState;
    const app = apps[currentApp] || {} ;

    return dotProp.get(app, `menus.${target}`, []);//app.menus && app.menus[target] ? app.menus[target] : []
  }


//  super methods

//  fetchMore()

//fetchCategories(obj={})

  getMenuData(){
      const menu = this.getAppMenu();
      return this.prepareMenu(menu);
  }

componentWillMount(){
  this._isMounted = false;
  //set cancelToken
  //this.cancelToken = this.props.cancelToken();
}

componentWillUnmount() {
  this._isMounted = false;

  //if(this.cancelToken){ this.cancelToken.cancel('ComponenetWillUnmount');}
}

componentDidMount() {
  this._isMounted = true;

  //console.log("getMenuData", this.getMenuData())

}


        render() {

        //console.log(this.props.url);

        const {navigation, theme} = this.props;

        
        //var categories = this.props.categories ? this.props.categories.data : [];

        

        const menu = this.getMenuData();


        const args = {menu, theme};

        if(navigation){
          args.navigation = navigation;
        }

        return (
            <Comp {...args} />
        )
        }

    }



const mapStateToProps = state => {
  
  const appIndex =  state.globalState.currentApp || 0;
  const apps = state.globalState.apps || [];
  const theme = apps && apps[appIndex] && apps[appIndex]['theme'];

      return ({
          url: state.globalState.url,
//              posts:state.api[`posts-${appIndex}`],
          categories:state.api[`categories-${appIndex}`], 
          gState:state.globalState, 
          appIndex,
          theme
  
    });
  };


export default compose(
    connect(mapStateToProps, {getApi, cancelToken}),
    MainMenuContainer
  );