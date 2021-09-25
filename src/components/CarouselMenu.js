import React,   {useState,useEffect, Component} from "react";
import {StyleSheet,View,Image,Dimensions,Text} from "react-native"
import Carousel from "react-native-snap-carousel";

const {width} = Dimensions.get('window'); 
const ITEM_WIDTH = Math.round(width*0.7);

export default function CarouselMenu (props) {
    const{data} = props;  
/*export class CarouselMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            entries: [
                {title: "Cuentos de hadas de Andersen"},
                {title: "Green's Fairy Tales"},
                {title: "Mi cuento de hadas"}



            ]

        }



    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ item.title }</Text>
            </View>
        );
    }   
 
    render () {
        return (
            <Carousel
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={width}
              itemWidth={itemWidth}
            />
        );
    }

    */
    return(
        <Carousel
            Layout={'default'}
            data={data}
            renderItem={(item)=> <RenderItem data={item} />}
            sliderWidth = {width}
            itemWidth={ITEM_WIDTH}

        />

    )

}
    function RenderItem(props){
        const{data} =props;
        const {fuente} = data.item;
    
        return(
            <View style = {Styles.card}>
                <Image style= {Styles.Image} source ={fuente}></Image> 
            </View>
    

        );

        }

    const Styles = StyleSheet.create({
        card: {
            shadowColor: '#000' ,
            shadowOffset: {
                width:0,
                height:50,

            },
            shadowOpacity: 100,
            shadowRadius:50,


        },
        Image: {
           width:"108%"


        }






    }





    )   
        
    


    




