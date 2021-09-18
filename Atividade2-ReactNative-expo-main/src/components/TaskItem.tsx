import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';


import {
  Image, 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet,
  TextInput } 
from 'react-native';

import {Feather} from '@expo/vector-icons';



import trashIcon from '../assets/icons/trash/trash.png';

import editIcon from '../assets/icons/edit/edit.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskEdit {
    id: number,
    taskNewTitle: string
  }
  
export interface TaskItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({id, taskNewTitle}: TaskEdit) => void;
  item: Task;
  index: number;
}

export function TaskItem({ item, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);


    function handleStartEditing() {
        setEditMode(true);
    }

    function handleCancelEditing() {
      setEditedTitle(item.title);
      setEditMode(false);
    }

    function handleSubmitEditing() {
      var edit = { id :item.id, taskNewTitle: editedTitle};
      editTask(edit)
      setEditMode(false);
    }

    useEffect(() => {
      if (textInputRef.current) {
        if (editMode) {
          textInputRef.current.focus();
        } else {
          textInputRef.current.blur();
        }
      }
    }, [editMode])
    
    return (
        <>
        <View>
            <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            //TODO - use onPress (toggle task) prop
            >
            <View 
                testID={`marker-${index}`}
                //TODO - use style prop 
            >
                { item.done && (
                <Feather 
                    name="check"
                    size={12}
                    color="#FFF"
                />
                )}
            </View>

            <TextInput 
              ref={textInputRef}
              style={ item.done ? styles.taskTextDone : styles.taskText}
              value={editedTitle}
              editable={editMode}
              onChangeText={setEditedTitle}
              onSubmitEditing={handleSubmitEditing}
/>
            </TouchableOpacity>
        </View>

        <View style={ styles.iconsContainer } >
  { editMode ? (
    <TouchableOpacity
      onPress={handleCancelEditing}
    >
     <Text>X</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={handleStartEditing}
    >
      <Image source={editIcon} />
    </TouchableOpacity>
  ) }

  <View 
    style={ styles.iconsDivider }
  />

  <TouchableOpacity
    disabled={editMode}
    onPress={() => removeTask(item.id)}
  >
    <Image source={trashIcon} style={{ opacity: editMode ? 0.2 : 1 }} />
  </TouchableOpacity>
</View>
        </>
    )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    
  },
  iconsDivider: {
  
  }

})