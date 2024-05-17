import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';

const screenWidth = Dimensions.get("screen").width;
export const tinderCardWidth = screenWidth * 0.8;

type TinderCardProps = {
    user: {
        id: number,
        image: string,
        name: string,
    };
    numOfCards: number;
    index: number;
}

const TinderCard = ({user,  numOfCards, index }: TinderCardProps) => {
  return (
    <View style={[styles.card, {
        zIndex: numOfCards - index,
        transform: [{translateY: -index * 40}, {scale: 1 - index * 0.1} ],
        opacity: 1 - index * 0.25,
    },
    ]}>
        {/* StyleSheet.absoluteFillObject - this basically occupies all space of parent */}
        <Image source={{uri: user.image}} style={[StyleSheet.absoluteFillObject, styles.image]} />
        <LinearGradient
          // Background Linear Gradient
          colors={['transparent', 'rgba(0,0,0,1)']}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />
        <View style={styles.footer}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
    </View>
  )
}

export default TinderCard

const styles = StyleSheet.create({
    card: {
        width: tinderCardWidth,
        aspectRatio: 1 / 1.67,
        borderRadius: 15,
        justifyContent: 'flex-end',
        position: 'absolute',
         // shadow
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    image: {
        borderRadius: 15,
    },
    footer: {
        padding: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'Inter',
    },
    overlay: {
        top: '50%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    }
})