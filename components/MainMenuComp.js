import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
//import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Drawer, List, Button  } from 'react-native-paper';
//import LoadingComp from './LoadingComp';
//import theme from '../customTheme';
import { DefaultTheme } from 'react-native-paper';
import {default as Box} from '../layouts/ResponsiveBox';
import MainMenuContainer from '../containers/MainMenuContainer';


const MainMenuComp = ({menu=[], navigation, theme=DefaultTheme}) => {

    const [active, setActive] = useState(-1)

    const showMenu = menu.map((item, index) => {

        const {key, name, icon, onPress} = item;

        const extra = {}
        extra.icon = icon;
        extra.style = {flex:1}

        //if name not found
        if(name==='' && icon){
            extra.style.flex = 0.2;
        }

        const isActive = index===active;
        
        return (
            <Drawer.Item key={key}
                label={name}
                onPress={() => {
                    setActive(index);
                    navigation.closeDrawer();
                    onPress();
                    }}
                active={isActive}
                {...extra}
            />)}
        );

        const {colors} = theme;
    //style={{flex:1}}                
/*
 
     
*/

if(menu.length===0){
    return null;
}

return (
    <Box style={{pWidth:100, height:50}}>
        <ScrollView style={{flex:1}} horizontal={true} showsHorizontalScrollIndicator={false} >
            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                {showMenu}
            </View>
        </ScrollView>    
    </Box>            
)};

//
export default MainMenuContainer(MainMenuComp);