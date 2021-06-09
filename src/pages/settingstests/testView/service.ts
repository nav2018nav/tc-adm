import request from "@/utils/request";
import { TableListParams } from "./data.d";

export async function fetchTestDetail(params?: TableListParams) {
  return request("/api/tests/" + params.id, {});
}

export async function removeRule(params: { key: number[] }) {
  return request("/api/rule", {
    method: "POST",
    data: {
      ...params,
      method: "delete",
    },
  });
}

export async function addRule(params: TableListParams) {
  return request("/api/rule", {
    method: "POST",
    data: {
      ...params,
      method: "post",
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request("/api/rule", {
    method: "POST",
    data: {
      ...params,
      method: "update",
    },
  });
}
