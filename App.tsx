
import React, { useState, useEffect } from 'react';
import RadioButton from './components/RadioButton';

import { data } from './data/data'
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {

  // State of fetched data. Supposing we simulated a data fetched and stored them in a hook
  const [fetchedData, setFetchedData] = useState(data.menus);
  const [fetchedRules, setFetchedRules] = useState(data.rules);

  // Sets the active category in the state
  const [activeCategory, setActiveCategory] = useState<string[]>([])
  const [restriction, setRestrictions] = useState<string[]>([])


  const selectCategory = (props: string) => {
    setActiveCategory(activeCategory => {
      const index = activeCategory.indexOf(props);
      if (index !== -1) {
        // Value already exists in the array, remove it
        return activeCategory.filter(item => item !== props);
      } else {
        // Value doesn't exist in the array, add it
        return [...activeCategory, props];
      }
    });
  };



  // Check restrictions of main dishes based on selected food category
  // Converts the array to key value pair and returns the value whose key are part of the active selected categories
  useEffect(() => {
    const result = Object.entries(fetchedRules)
      .filter(([key, _]) => activeCategory.includes(key))
      .flatMap(([_, value]) => value.map(String));
    setRestrictions(result)
  }, [activeCategory])

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Select Restriction</Text>
      <FlatList
        data={fetchedData[0]}
        renderItem={
          ({ item }) => <RadioButton data={item} enabled={true} onChildData={selectCategory} />
        }
      />

      <Text style={styles.sectionHeader}> Select a Dish</Text>
      <FlatList
        data={fetchedData[1]}
        renderItem={
          ({ item }) => <RadioButton data={item} enabled={restriction.includes(item.id) ? false : true} onChildData={() => { }} />
        }
      />

      <Text style={styles.sectionHeader}>Select an Add-on</Text>
      <FlatList
        data={fetchedData[2]}
        renderItem={
          ({ item }) => <RadioButton data={item} enabled={restriction.includes(item.id) ? false : true} onChildData={() => { }} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 50,
    marginVertical: 200,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sectionHeader: {
    marginBottom: 5
  }
});
