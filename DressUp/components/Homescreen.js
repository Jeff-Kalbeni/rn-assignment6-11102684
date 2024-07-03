import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'Office Wear',
    subtitle: 'reversible angora cardigan',
    price: '$120',
    image: require('../assets/dress1.png'),
    overlayImage: require('../assets/add_circle.png'),
  },
  {
    id: '2',
    title: 'Black',
    image: require('../assets/dress2.png'),
    subtitle: 'reversible angora cardigan',
    price: '$120',
    overlayImage: require('../assets/add_circle.png'),
  },
  {
    id: '3',
    title: 'Church Wear',
    image: require('../assets/dress3.png'),
    subtitle: 'reversible angora cardigan',
    price: '$120',
    overlayImage: require('../assets/add_circle.png'),
  },
  {
    id: '4',
    title: 'Lamarei',
    image: require('../assets/dress4.png'),
    subtitle: 'reversible angora cardigan',
    price: '$120',
    overlayImage: require('../assets/add_circle.png'),
  },
  {
    id: '5',
    title: '21WN',
    image: require('../assets/dress5.png'),
    subtitle: 'reversible angora cardigan',
    price: '$120',
    overlayImage: require('../assets/add_circle.png'),
  },
  {
    id: '6',
    title: 'Lopo',
    image: require('../assets/dress6.png'),
    subtitle: 'reversible angora cardigan',
    price: '$120',
    overlayImage: require('../assets/add_circle.png'),
  },
  {
    id: '7',
    title: '21WN',
    subtitle: 'reversible angora cardigan',
    price: '$120',
    image: require('../assets/dress7.png'),
    overlayImage: require('../assets/add_circle.png'),
  },
  {
    id: '8',
    title: 'lame',
    subtitle: 'reversible angora cardigan',
    price: '$120',
    image: require('../assets/dress3.png'),
    overlayImage: require('../assets/add_circle.png'),
  },
]



export default function Home({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [numColumns, setNumColumns] = useState(2);

  const addToCart = async (item) => {
    try {
      const newCartItems = [...cartItems, item];
      setCartItems(newCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
    } catch (error) {
      console.log('Error storing cart items: ', error);
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.FlItem}>
        <Image source={item.image} style={styles.FlatImage}/>
        <TouchableOpacity>
          <Image 
          source={item.overlayImage} style={styles.overlayImage}
          onPress={() => addToCart({id: 1, name: 'Item 1'})}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.imageTitle}>{item.title}</Text>
      <Text style={styles.imageSubtitle}>{item.subtitle}</Text>
      <Text style={styles.imagePrice}>{item.price}</Text>
    </View>
);
//style={styles.FlatImage}
  return (
    <SafeAreaView style={styles.container}>
        <View  style={styles.header}>
          <Image source={require('../assets/Menu.png')}/>
          <Image source={require('../assets/Logo.png')}/>
          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <Image source={require('../assets/Search.png')}/>
            <Image style={{marginLeft: 5}} source={require('../assets/shoppingBag.png')}/>
          </View>
        </View>

        <View style={styles.Story}>
          <Text>Our Story</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
            <View style={styles.storyIcon}>
                <Image source={require('../assets/Listview.png')}/>
            </View>

            <View style={[styles.storyIcon, {marginLeft: 5,}]}>
            <Image source={require('../assets/Filter.png')}/>
            </View>
          </View>
        </View>

        <View style={{flex:1}}>
          <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns= {numColumns}
          key={numColumns}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Go to Cart"
            color="#FF6347"
            onPress={() => navigation.navigate('Cart')}
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 5,
    paddingLeft: 10,
  },

  Story: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    paddingRight: 5,
    paddingLeft: 10,
  },
  storyIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(211, 211, 211, 0.2)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  FlItem: {
    marginVertical: 8,
    marginHorizontal: 10,
    position: 'relative',
  },
  FlatImage: {
    width: 160,
    // height: 250,
    marginBottom: 0,
  },
  imageTitle:{
    fontSize: 16,
    marginLeft: 14,
    fontFamily: 'Roboto',
  },
  item: {
    flex:1,
  },
  overlayImage: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 8,
    right: -1,
  },
  imageSubtitle: {
    fontSize: 14,
    marginLeft: 14,
  },
  imagePrice: {
    fontSize: 16,
    color: 'orange',
    marginLeft: 14,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 100,
    right: 100,
    width: 150,
    height: 50,
    paddingHorizontal: 16,
    
  },
});
