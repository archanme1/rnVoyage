import { Link } from 'expo-router';
import { Text, View, StyleSheet, Pressable } from 'react-native';

type DayListItem = {
  day: number;
};

export default function DayListItem({ day }: DayListItem) {
  return (
      <Link href={`/feature${day}`} asChild>
        <Pressable style={styles.box}>
        <Text style={styles.text}>{day}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#32572f',
    flex: 1,
    aspectRatio: 1,

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#9b4521',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#7e9e7b',
    fontSize: 75,
    fontFamily: 'AmaticBold',
  },
});
