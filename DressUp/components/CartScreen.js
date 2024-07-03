import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'OFFICE WEAR',
    subTitle: 'Office wear for you office',
    image: require('../assets/dress1.png'),
  },
  {
    id: '2',
    title: 'LAMEREI',
    subTitle: 'Recycle Boucle Knit Cardigan Pink',
    image: require('../assets/dress4.png'),
  },
  
  {
    id: '3',
    title: 'CHURCH WEAR',
    subTitle: 'Recycle Boucle Knit Cardigan Pink',
    image: require('../assets/dress3.png'),
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('cartItems');
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.log('Error retrieving cart items: ', error);
      }
    };

    getCartItems();
  }, []);

  const removeItemFromCart = async (itemToRemove) => {
    try {
      const updateCartItems = cartItems.filter(item => item.id !== itemToRemove.id);
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.log('Error removing cart item: ', error);
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{}}>
        <Image source={item.image} style={styles}/>
      </View>

      <View style={styles.description}>
        <Text>{item.title}</Text>
        <Text style={{width: 150}}>{item.subTitle}</Text>
        <Text style={styles.imagePrice}>$120</Text>
      </View>
      <TouchableOpacity style={styles.removeIcon}
        onPress={() => removeItemFromCart(item)}
      >
        <Image  source={require('../assets/remove.png')}/>
      </TouchableOpacity>
      
    </View>
);

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/Logo.png')}/>
            <Image source={require('../assets/Search.png')}/>
        </View>

        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <Text style={styles.checkText}>CHECKOUT</Text>
          <Image/>
        </View>

        <View style={{flex:1, paddingBottom: 10}}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            />
        </View>

        {cartItems.map((item) => (
          <Text key={item.id}>{item.name}</Text>
        ))}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={{ fontSize: 15, paddingTop: 5}}>EST. TOTAL</Text>
          <Text style={{color: 'orange', fontSize: 20}}>$240</Text>
        </View>

        <View>
          <TouchableOpacity style={styles.button}>
              <Image source={require('../assets/shoppingBag.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 80,
    padding: 10,

  },
  checkText: {
    fontSize: 20,
    paddingTop: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  removeIcon: {
    position: 'absolute',
    bottom: 15,
    right: 5,
  },
  description:{
    flexDirection: 'column',
    marginLeft: 5,
    justifyContent: 'center',
  },
  imagePrice: {
    fontSize: 16,
    color: 'orange',
  },
  button: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 1,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonImage: {
    right: 5,
    height: 24,
    width: 24,
    tintColor: '#fff'
  }
});
