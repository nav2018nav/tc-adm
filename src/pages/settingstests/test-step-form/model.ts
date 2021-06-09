import { Effect, Reducer } from "umi";

import {
  fakeSubmitForm,
  queryFakeList,
  queryFakeQuestionsPractical,
  queryFakeQuestionsPhysical,
  fetchquetionslist,
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
    fetchquetions: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: "testFormAndstepForm",

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
      yield call(fakeSubmitForm, payload);
      yield put({
        type: "saveStepFormData",
        payload,
      });

      yield put({
        type: "saveCurrentStep",
        payload: "result",
      });

      yield put({
        type: "testList_details",
        payload: response ? response : [],
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);

      yield put({
        type: "queryList",
        payload: Array.isArray(response) ? response : [],
      });
    },

    *fetchquetions({ payload }, { call, put }) {
      const response = yield call(fetchquetionslist, payload);
     // console.log(response);
      yield put({
        type: "fetch_que",
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },

    *fetchQuestionsPractical({ payload }, { call, put }) {
      const response = yield call(queryFakeQuestionsPractical, payload);

      yield put({
        type: "queryListQuestionsPractical",
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *fetchQuestionsPhysical({ payload }, { call, put }) {
      const response = yield call(queryFakeQuestionsPhysical, payload);

      yield put({
        type: "queryListQuestionsPhysical",
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },

    *fetchQuestionsPhysical1({ payload }, { call, put }) {
      const response = yield call(queryFakeQuestionsPhysical, payload);
      yield put({
        type: "queryListQuestionsPhysical1",
        payload: response.data ? response.data : [],
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },
    fetch_que(state, action) {
      return {
        ...state,
        fetch_que: action.payload,
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

    testList_details(state, action) {
      return {
        ...state,
        testList_details: action.payload,
      };
    },

    queryList(state, action) {
      // console.log(action);
      return {
        ...state,
        list: action.payload,
      };
    },

    queryListQuestionsPractical(state, action) {
      return {
        ...state,
        questionsListPractical: action.payload,
      };
    },
    queryListQuestionsPhysical(state, action) {
      return {
        ...state,
        questionsListPhysical: action.payload,
      };
    },
    queryListQuestionsPhysical1(state, action) {
      return {
        ...state,
        questionsListPhysical1: action.payload,
      };
    },
  },
};

export default Model;
