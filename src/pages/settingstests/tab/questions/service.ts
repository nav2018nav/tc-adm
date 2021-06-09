import request from "@/utils/request";

export async function queryExamHistory() {
  return request("https://boxing-org-api.glendot.com/api/directory/teams");
}
export async function queryProvince() {
  return request("/api/geographic/province");
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request("/api/users");
}

export async function queryRule(params?: TableListParams) {
  return request("/api/questions", {
    params,
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

export async function updateFakeList(params: ParamsType) {
  console.log("params called");
  console.log(params);
  //return false;
  //const { count = 5, ...restParams } = params;
  return request("/api/questions/" + params.id, {
    method: "PUT",
    data: params,
  });
}

export async function removeQuestionsList(params: ParamsType) {
  const { ...restParams } = params;
  return request("/api/users/" + params.id, {
    method: "Delete",
    data: {
      ...restParams,
    },
  });
}

export async function queryFakeList(params: ParamsType) {
  return request("/api/test-category", {
    params,
  });
}

export async function make_inactive(params: ParamsType) {
  const { ...restParams } = params;
  return request("/api/questions/" + params.id, {
    method: "PUT",
    data: { status: "inactive" },
  });
}

export async function make_active(params: ParamsType) {
  const { ...restParams } = params;

  return request("/api/questions/" + params.id, {
    method: "PUT",
    data: { status: "active" },
  });
}

export async function updateStatusAction(params: ParamsType) {

  return request("/api/questions/" + params.id, {
    method: "PUT",
    data: { status: params.status },
  });
}

