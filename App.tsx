import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, SectionList } from 'react-native';
import RadioButton from './components/RadioButton';
import { data } from './data/data'

type DataItem = {
  id: string;
  value: string;
};

type SectionData = {
  id: number;
  title: string;
  data: DataItem[];
  disabled?: string[];
};

export default function App() {

  // State of fetched data. Supposing we simulated a data fetched and then stored them in a hook
  // Supposing this is a hook (fetchedData and fetchedRules)
  const fetchedData = data.menus.map((menu, index) => ({
    id: index,
    title: `Menu ${index}`,
    data: menu
  }));
  const fetchedRules = data.rules;

  // Sets the active category in the state
  const [activeCategory, setActiveCategory] = useState<string[]>([]);

  // added useCallback to memoize the function
  const selectCategory = useCallback((props: string) => {
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
  }, []);

  // Check restrictions of main dishes based on selected food category
  // Converts the array to key value pair and returns the value whose key are part of the active selected categories
  // Memoize the restrictions
  const restrictions = useMemo(() => {
    return Object.entries(fetchedRules)
      .filter(([key, _]: [string, any]) => activeCategory.includes(key))
      .reduce((acc: any[], [_, value]: [string, any[]]) => [...acc, ...value], []);
  }, [activeCategory, fetchedRules]);

  // Preparing the section list from the fetched data in data.ts
  const sectionsData: SectionData[] = [
    {
      id: 0,
      title: 'Select Restriction',
      data: fetchedData[0].data,
    },
    {
      id: 1,
      title: 'Select a Dish',
      data: fetchedData[1].data,
      disabled: restrictions,
    },
    {
      id: 2,
      title: 'Select an Add-on',
      data: fetchedData[2].data,
      disabled: restrictions,
    },
  ];

  // Render screen
  return (
    <View style={styles.container}>
      <SectionList
        sections={sectionsData}
        keyExtractor={(item, index) => item.id + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item, section }) => (
          <RadioButton
            data={item}
            enabled={
              activeCategory.length === 0 && section.id !== 0
                ? false
                : !section.disabled || !section.disabled.includes(item.id)
            }
            onSelect={selectCategory}
          />
        )}
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
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
