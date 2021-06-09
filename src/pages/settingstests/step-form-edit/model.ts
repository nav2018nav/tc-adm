import { Effect, Reducer } from "umi";

import { fakeSubmitForm, queryFakeList, queryListQuestion } from "./service";

export interface StateType {
  current?: string;
  step?: {
    // payAccount: string;
    //receiverAccount: string;
    //receiverName: string;
    //amount: string;
  };
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
  namespace: "questionEditFormAndstepForm",

  state: {
    current: "info",
    step: {
      // payAccount: 'ant-design@alipay.com',
      // receiverAccount: 'test@example.com',
      // receiverName: 'Alex',
      // amount: '500',
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      console.log(payload);
      yield call(fakeSubmitForm, payload);
      yield put({
        type: "saveStepFormData",
        payload,
      });
      yield put({
        type: "saveCurrentStep",
        payload: "result",
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      console.log(response);
      yield put({
        type: "queryList",
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchQuestion({ payload }, { call, put }) {
      const response = yield call(queryListQuestion, payload);
      // console.log(response);
      yield put({
        type: "queryListQuestion",
        payload: response ? response : [],
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },

    queryList(state, action) {
      console.log(action);
      return {
        ...state,
        list: action.payload,
      };
    },

    queryListQuestion(state, action) {
      //  console.log(action);
      return {
        ...state,
        question: action.payload,
      };
    },
  },
};

export default Model;
