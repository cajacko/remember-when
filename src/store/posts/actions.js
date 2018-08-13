// @flow

import makeActionCreator from '@cajacko/lib/dist/utils/makeActionCreator';
import { ensureDate } from '@cajacko/lib/dist/utils/dates';
import generateID from '../../utils/generateID';

export const SAVE_POST_ACTION = 'SAVE_POST';
export const DELETE_POST_ACTION = 'DELETE_POST';

export const savePost = (id, content, date) => ({
  type: SAVE_POST_ACTION,
  payload: {
    isNewPost: !id,
    id: id || generateID(),
    content,
    date: ensureDate(date).getTime(),
  },
});

export const deletePost = makeActionCreator(DELETE_POST_ACTION, 'id');
