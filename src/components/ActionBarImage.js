import React from 'react';
import {View, Image,StyleSheet,TouchableOpacity} from 'react-native';
const ActionBarImage = ({navigation}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={() =>  navigation.navigate('BookMark')  }>
      <Image
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',
        }}
        style={styles.bookmarkImage}
      />
      </TouchableOpacity>
    </View>
  );
};
export default ActionBarImage;


const styles = StyleSheet.create({
  bookmarkImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: 15,
  },
});