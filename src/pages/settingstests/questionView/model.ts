import { Effect, Reducer } from "umi";

import { fetchQuestionDetail } from "./service";

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
  namespace: "questionView",

  state: {
    current: "info",
    step: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetchQuestionDetail, payload);

      yield put({
        type: "questionList",
        payload: response ? response : [],
      });
    },
  },

  reducers: {
    questionList(state, action) {
      return {
        ...state,
        questionList: action.payload,
      };
    },
  },
};

export default Model;
