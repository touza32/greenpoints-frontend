import React, { useState } from "react";
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from "react-native"
import Carousel, { Pagination } from "react-native-snap-carousel";

const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarouselMenu(props) {
    const { data, navigation, puntos, onPress } = props;
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                Layout={'default'}
                data={data}
                renderItem={item =>
                    <View>
                        <TouchableOpacity
                            onPress={()=>onPress(item)}
                        >
                            <Image style={Styles.Image} source={{ uri: item.item.imagen }} />
                        </TouchableOpacity>
                    </View>

                }
                sliderWidth={width}
                itemWidth={ITEM_WIDTH}
                itemHeight={150}
                onSnapToItem={index => setActiveSlide(index)}
                loop={true}
            />
            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeSlide}
                containerStyle={{ marginTop: -70 }}
                dotStyle={{
                    width: 15,
                    height: 15,
                    borderRadius: 7.5,
                    marginHorizontal: 8,
                    backgroundColor: 'white'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    )

}

const Styles = StyleSheet.create({
    Image: {
        width: "108%",
        height: '100%'
    }
}
)









