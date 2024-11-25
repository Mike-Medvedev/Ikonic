import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
export default function TabLayout() {
  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: '#ffd33d',
    headerStyle: {
      backgroundColor: '#25292e',
    },
    headerShadowVisible: true,
    headerTintColor: '#fff',
    tabBarStyle: {
    backgroundColor: '#25292e',
    },
  }}
>
    <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="newspaper-o" size={24} color={color} />
          ),
          headerLeft: () => (
            <Text style={styles.headerRight}>Ikonic</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="pluscircle" size={24} color={color} />
          ),
          headerLeft: () => (
            <Text style={styles.headerRight}>Ikonic</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="user-circle" size={24} color={color} />
          ),
        }}
      />
       
    </Tabs>
  );
}
const styles = StyleSheet.create({
    headerRight: {
        fontSize: 26,
        color: '#ffd33d'
    }
})