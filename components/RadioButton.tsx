import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'

export interface RadioProps {
  id: string;
  value: string;
}

type RadioButtonProps = {
  data: RadioProps;
  enabled: boolean;
  onSelect: (id: string) => void;
}

const RadioButton = React.memo(({ data, enabled, onSelect }: RadioButtonProps) => {
  // States
  const [selected, setSelected] = useState(false);

  // Functions
  const selectItem = useCallback(() => {
    if (enabled) {
      setSelected(!selected)
      onSelect(data.id)
    } else {
      onSelect("")
    }
  }, [enabled, selected, data.id, onSelect]);

  const radioButtonStyle = [styles.radioButton, selected && styles.radioButtonSelected];

  return (
    <View style={styles.radioContainer}>
      <TouchableOpacity disabled={!enabled} onPress={selectItem} style={radioButtonStyle} />
      <View style={styles.radioTextContainer}>
        <Text style={enabled ? styles.radioText : styles.radioTextDisabled}>{data.value}</Text>
      </View>
    </View>
  )
})

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
    width: 20,
    height: 20
  },
  radioButtonSelected: {
    backgroundColor: '#C5E3EC',
  }
});

export default RadioButton;

