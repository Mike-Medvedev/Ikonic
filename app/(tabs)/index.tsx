import React from 'react';
import { StyleSheet, TextInput, Text, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const newEnglandSkiResorts = [
  "Killington Resort",
  "Stowe Mountain Resort",
  "Sunday River",
  "Sugarloaf",
  "Jay Peak",
  "Okemo Mountain Resort",
  "Mount Snow",
  "Loon Mountain Resort",
  "Bretton Woods",
  "Stratton Mountain Resort",
  "Sugarbush Resort",
  "Cannon Mountain",
  "Attitash Mountain Resort",
  "Wildcat Mountain",
  "Smugglers' Notch Resort"
];

const Index = () => {
  const [text, onChangeText] = React.useState('');
  const [mountains, setMountains] = React.useState<string[]>(newEnglandSkiResorts);

  const handleTextChange = (input: string): void => {
    if(!input) {
      setMountains(newEnglandSkiResorts)
    }
    onChangeText(input);
    setMountains(
      newEnglandSkiResorts.filter((m) =>
        m.toLowerCase().includes(input.toLowerCase())
      )
    );

  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={handleTextChange}
          value={text}
          placeholder='Search Mountain'
          placeholderTextColor="#888" // Light gray placeholder
        />
        {/* Wrap the mountain list in ScrollView */}
        <ScrollView contentContainerStyle={styles.mountainList}>
          {mountains.map((m, idx) => (
            <Text key={idx} style={styles.listElement}>{m}</Text>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  mountainList: {
    alignItems: 'center', // Center text horizontally
    paddingVertical: 10, // Add some padding for better spacing
  },
  listElement: {
    marginVertical: 20,
    fontSize: 16,
  },
});

export default Index;
