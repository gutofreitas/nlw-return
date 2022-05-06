import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props {
    screenshot: string|null;
    onTakeShot: () => void;
    onRemoveShot: () => void;
    isLoading: boolean;
    
}

export function ScreenshotButton({screenshot, onRemoveShot, onTakeShot, isLoading} : Props) {
  return (
    <TouchableOpacity 
        style={styles.container}
        onPress={screenshot ? onRemoveShot : onTakeShot}
    >

      {
        isLoading 
        ? 
            <ActivityIndicator color={theme.colors.text_on_brand_color}/>
        :
      
            screenshot 
            ?
            <>
                <Image style={styles.image} source= {{uri: screenshot}} />
                
                <Trash
                    size={22} 
                    color={theme.colors.text_secondary}
                    weight="fill"
                    style={styles.removeIcon}
                />

            </>
            :
            <Camera
                size={22} 
                color={theme.colors.text_secondary}
                weight="fill"
                style={styles.camera}
            />
      }


    </TouchableOpacity>
  );
}