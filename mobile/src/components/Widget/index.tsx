import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import BottoSheet from '@gorhom/bottom-sheet';
import { ChatTeardropDots } from 'phosphor-react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../theme';
import { useRef } from 'react';
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const bottonSheetRef = useRef<BottoSheet>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType|null>(null);


  function handleOpen () {
    bottonSheetRef.current?.expand();
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </TouchableOpacity>

      <BottoSheet
        ref={bottonSheetRef}
        snapPoints= {[1,280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          !feedbackType 
          ?
            <Options onFeedbackTypeChanged={setFeedbackType}/>
          :
            !feedbackSent 
            ?
              <Form
                onFeedbackRestartRequested={() => setFeedbackType(null)}
                onFeedBackSent= {() => setFeedbackSent(true)}
                feedbackType={feedbackType}
              />
            :
              <Success onFeedbackRestartRequested={() => {
                setFeedbackType(null);
                setFeedbackSent(false);
              }}/>
        }

      </BottoSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);