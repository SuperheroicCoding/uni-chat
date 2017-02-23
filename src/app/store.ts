import {Action} from 'redux';
import {Component} from '@angular/core';
import {SET_ROOT_PAGE_ACTION} from '../providers/init-actions';

export interface UniState {
  rootPage: Component;
}

export interface IPayloadAction extends Action {
  payload?: any;
  error?: any;
}

export const INITIAL_STORE: UniState = {
  rootPage: null
};

export function rootReducer(store: UniState, action: IPayloadAction) {

  switch (action.type) {
    case SET_ROOT_PAGE_ACTION :
      return {rootPage: action.payload.rootPage}
  }

  return store;
}


