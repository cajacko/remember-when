// @flow

import safeAreaViewSubscriptions from '@cajacko/lib/dist/utils/safeAreaViewSubscriptions';
import { BLACK } from '@cajacko/lib/dist/config/styles/colors';
import { ENTRY } from './config/routes';

safeAreaViewSubscriptions.set(null, null, {
  topColor: BLACK,
  bottomColor: BLACK,
  statusBarColor: BLACK,
  statusBarStyle: 'light-content',
});

export const ROUTES = ENTRY;
