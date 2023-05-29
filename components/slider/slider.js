import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {API_URL} from '@env';

const windowWidth = Dimensions.get('window').width;

let width = windowWidth - 40;
export default function Slider({data}) {
  const scrollValue = useRef(new Animated.Value(0)).current;
  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 20],
  });
  const inputRange = [0];
  const scaleOutputRange = [1];
  data?.forEach(
    (_, i) =>
      i != 0 && inputRange.push(...[(width * (2 * i - 1)) / 2, width * i]),
  );
  data?.forEach((_, i) => i != 0 && scaleOutputRange.push(...[0, 1]));
  const scaleX = scrollValue.interpolate({
    inputRange,
    outputRange: scaleOutputRange,
  });
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollValue}}}],
          {useNativeDriver: false},
        )}>
        {data?.map(($, _) => (
          <Image
            source={{uri: `${API_URL}/uploads/${$.image} `}}
            resizeMode="contain"
            style={styles.card}
            key={_}
          />
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer} pointerEvents="none">
        {data?.map(($, _) => (
          <View style={styles.indicator} key={_} />
        ))}
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              position: 'absolute',
              transform: [{translateX}, {scaleX}],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 3,
    height: 236,
    marginBottom: 40,
  },
  card: {
    width: width - 10,
    height: '100%',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  indicatorContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: -20,
    flexDirection: 'row',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#00000044',
    marginHorizontal: 5,
  },
  activeIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#662916',
    marginHorizontal: 5,
  },
});
