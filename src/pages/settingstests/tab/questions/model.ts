import { Effect, Reducer } from "umi";
import { BasicStudentDetail } from "./data.d";
import {
  queryCity,
  queryFakeList,
  queryRule,
  queryExamHistory,
  queryProvince,
  updateFakeList,
  removeFakeList,
  removeQuestionsList,
  query,
  make_active,
  make_inactive,
} from "./service";

export interface ModalState {
  isLoading?: boolean;
}

export interface StateType {
  data: Data[];
}

export interface ModelType {
  namespace: string;
  state: BasicStudentDetail;
  effects: {
    fetchCurrent: Effect;
    fetchAuthorization: Effect;
    fetchExamHistory: Effect;
    fetch: Effect;
    fetchProvince: Effect;
    fetchCity: Effect;
    submit: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<ModalState>;
    changeNotifyCount: Reducer<ModalState>;
    setProvince: Reducer<ModalState>;
    setCity: Reducer<ModalState>;
    changeLoading: Reducer<ModalState>;
    show: Reducer<BasicStudentDetail>;
  };
}

const Model: ModelType = {
  namespace: "settingstestsQuestions",

  state: {
    currentUser: {},
    province: [],
    city: [],
    isLoading: false,
    data: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: "save",
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: "queryList",
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: "saveCurrentUser",
        payload: response,
      });
    },
    *fetchExamHistory(_, { call, put }) {
      const response = yield call(queryRule);
      yield put({
        type: "show",
        payload: response,
      });
    },
    *fetchAuthorization(_, { call, put }) {
      const response = yield call(queryRule);
      yield put({
        type: "show",
        payload: response,
      });
    },
    *fetchProvince(_, { call, put }) {
      yield put({
        type: "changeLoading",
        payload: true,
      });
      const response = yield call(queryProvince);
      yield put({
        type: "setProvince",
        payload: response,
      });
    },
    *fetchCity({ payload }, { call, put }) {
      const response = yield call(queryCity, payload);
      yield put({
        type: "setCity",
        payload: response,
      });
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(make_inactive, payload);
      yield put({
        type: "status",
        payload,
      });
    },
    *activesubmitStepForm({ payload }, { call, put }) {
      console.log("api");
      yield call(make_active, payload);

      yield put({
        type: "activestatus",
        payload: "result",
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback =
          Object.keys(payload).length === 1 ? removeUserList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: "queryList",
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state = {}, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    setProvince(state, action) {
      return {
        ...state,
        province: action.payload,
      };
    },
    setCity(state, action) {
      return {
        ...state,
        city: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
