import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'

export interface RadioProps {
  id: string;
  value: string;
}

interface RadioButtonProps {
  data: RadioProps;
  enabled: boolean;
  onChildData: (data: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ data, enabled, onChildData }) => {
  // States
  const [selected, setSelected] = useState(false);

  // Functions

  const selectItem = () => {
    if (enabled) {
      setSelected(!selected)
      onChildData(data.id)
    } else {
      onChildData("")
    }
  }

  return (
    <SafeAreaView style={styles.radioContainer}>
      <Pressable disabled={!enabled} onPress={() => selectItem()} style={selected ? styles.radioButtonSelected : styles.radioButton} />
      <View style={styles.radioTextContainer}>
        <Text style={enabled ? styles.radioText : styles.radioTextDisabled}>{data.value}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  radioText: {
    fontSize: 20,
    fontWeight: '500'
  },
  radioTextDisabled: {
    fontSize: 20,
    fontWeight: '500',
    color: 'grey'
  },
  radioTextContainer: {
    paddingLeft: 5,
  },
  radioContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  radioButton: {
    borderRadius: 20,
    borderColor: '#90D5EC',
    borderWidth: 2,
    backgroundColor: 'white',
    width: 20,
    height: 20
  },
  radioButtonSelected: {
    borderRadius: 20,
    borderColor: '#90D5EC',
    borderWidth: 2,
    backgroundColor: '#C5E3EC',
    width: 20,
    height: 20
  }
});

export default RadioButton