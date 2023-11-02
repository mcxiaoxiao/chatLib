import {useState,FC} from 'react';
import React from 'react';
import { atom,selector,atomFamily } from 'recoil';

export const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});


export const userID = atom({
  key: 'count',
  default: 10086,
});
