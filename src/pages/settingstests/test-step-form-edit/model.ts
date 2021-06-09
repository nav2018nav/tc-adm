import { Effect, Reducer } from "umi";

import {
  fakeSubmitForm,
  queryFakeList,
  queryListTest,
  queryFakeCategory,
  queryFakeQuestionsPractical,
  queryFakeQuestionsPhysical,
} from "./service";

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
  namespace: "testFormAndstepFormEdit",

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
      // console.log(payload);
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
      // console.log(response);
      yield put({
        type: "queryList",
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchCategory({ payload }, { call, put }) {
      const response = yield call(queryFakeCategory, payload);
      // console.log(response);
      yield put({
        type: "queryListCategory",
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchTest({ payload }, { call, put }) {
      const response = yield call(queryListTest, payload);
      // console.log(response);
      yield put({
        type: "queryListTest",
        payload: response ? response : [],
      });
    },
    *fetchQuestionsPractical({ payload }, { call, put }) {
      // console.log("fetchQuestions called");
      const response = yield call(queryFakeQuestionsPractical, payload);
      // console.log(response);
      yield put({
        type: "queryListQuestionsPractical",
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *fetchQuestionsPhysical({ payload }, { call, put }) {
      //  console.log("fetchQuestions called");
      const response = yield call(queryFakeQuestionsPhysical, payload);
      /// console.log(response);
      yield put({
        type: "queryListQuestionsPhysical",
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      // console.log(payload);
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
      //console.log(action);
      return {
        ...state,
        list: action.payload,
      };
    },
    queryListTest(state, action) {
      //  console.log(action);
      return {
        ...state,
        test: action.payload,
      };
    },
    queryListCategory(state, action) {
      //  console.log(action);
      return {
        ...state,
        listCategory: action.payload,
      };
    },
    queryListQuestionsPractical(state, action) {
      // console.log(action);
      return {
        ...state,
        questionsListPractical: action.payload,
      };
    },
    queryListQuestionsPhysical(state, action) {
      //console.log(action);
      return {
        ...state,
        questionsListPhysical: action.payload,
      };
    },
  },
};

export default Model;
