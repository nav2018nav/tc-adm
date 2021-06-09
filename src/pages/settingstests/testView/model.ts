import { Effect, Reducer } from "umi";

import { fetchTestDetail } from "./service";

export interface StateType {
  current?: string;
  step?: {};
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
    fetch: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: "testView",

  state: {
    current: "info",
    step: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchTestDetail, payload);

      yield put({
        type: "testList",
        payload: response ? response : [],
      });
    },
  },

  reducers: {
    testList(state, action) {
      return {
        ...state,
        testList: action.payload,
      };
    },
  },
};

export default Model;
