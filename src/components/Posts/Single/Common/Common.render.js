// @flow

import React from 'react';
import withRouter from '@cajacko/lib/dist/components/HOCs/withRouter';
import TextArea from '@cajacko/lib/dist/components/Forms/TextArea';
import HeaderWithContent from '@cajacko/lib/dist/components/Layout/HeaderWithContent';
import { format } from '@cajacko/lib/dist/utils/dates';
import Button from '@cajacko/lib/dist/components/Button';
import Align from '@cajacko/lib/dist/components/Layout/Align';
import buttons from '@cajacko/lib/dist/config/styles/buttons';

const PostsSingle = ({
  content,
  date,
  history: { goBack },
  isInEditMode,
  onChange,
  save,
  edit,
  showDatePicker,
  deletePost,
  isNewPost,
  cancelEdit,
  dataHasChanged,
  onTextAreaFocus,
  setTextAreaRef,
}) => (
  <HeaderWithContent
    header={{
      back: isInEditMode ? null : goBack,
      title: { _textFromConst: format('fullDate', date) },
      rightText: isInEditMode ? 'General.Save' : 'General.Edit',
      rightAction: isInEditMode ? save : edit,
      titleAction: showDatePicker,
      leftText: isInEditMode ? 'General.Cancel' : null,
      leftAction: isInEditMode ? cancelEdit : null,
      rightButtonStyle:
        (dataHasChanged && isInEditMode) || !isInEditMode
          ? buttons.TRANSPARENT.PRIMARY
          : buttons.TRANSPARENT.BLACK,
    }}
  >
    <TextArea
      autoFocus={isNewPost}
      value={content}
      onChange={onChange}
      onFocus={onTextAreaFocus}
      innerRef={setTextAreaRef}
    />
    {isInEditMode &&
      !isNewPost && (
        <Align centerHorizontally>
          <Button
            action={deletePost}
            text="General.Delete"
            type={buttons.CONTAINED.SECONDARY}
          />
        </Align>
      )}
  </HeaderWithContent>
);

export default withRouter(PostsSingle);
