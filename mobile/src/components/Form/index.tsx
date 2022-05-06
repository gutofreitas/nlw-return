import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import { theme } from '../../theme';
import { FeedbackType } from '../Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { Copyright } from '../Copyright';
import { api } from '../../libs/axios';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedBackSent: () => void;
}

export function Form({feedbackType, onFeedbackRestartRequested, onFeedBackSent}: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [screenshot, setScreenshot] = useState<string|null>(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [comment, setComment] = useState('');

  function handleScreenshot(){
    setIsLoadingForm(true);
    captureScreen({
      format: 'jpg',
      quality: 0.2
    })
    .then(uri => setScreenshot(uri))
    .catch(error => console.log(error));
    setIsLoadingForm(false);
  }

  async function handleSendFeedback() {
    setIsLoadingForm(true);
    const screenshotFormatted = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'});

    try {

      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotFormatted}`,
        comment
      })
      .then(response => console.log(response));
      console.log('eita giovana');
      
      onFeedBackSent();
    } catch (error) {
      console.log(error);
      setIsLoadingForm(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackRestartRequested}>
          <ArrowLeft size={24} weight='bold' color={theme.colors.text_secondary}/>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image 
            style={styles.image}
            source={feedbackTypeInfo.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput 
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />

      <View style={styles.footer} >
        <ScreenshotButton 
          onRemoveShot={() => setScreenshot(null)} 
          onTakeShot={handleScreenshot} 
          screenshot={screenshot}
          isLoading={isLoadingForm} 
        />

        <Button isLoading={isLoadingForm} onPress={handleSendFeedback}/>
      </View>

      <Copyright />
    </View>
  );
}