import request from "@/utils/request";

export async function queryCurrent() {
  return request("/api/currentUser");
}
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
  return request("/api/tests", {
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
  // console.log("called");
  console.log(params);
  //const { count = 5, ...restParams } = params;
  return request("/api/tests/" + params.id, {
    method: "PUT",
    data: params,
  });
}

export async function removeFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request("/api/fake_list", {
    method: "POST",
    params: {
      count,
    },
    data: {
      ...restParams,
      method: "delete",
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

  return request("/api/tests/" + params.id, {
    method: "PUT",
    data: { status: "inactive" },
  });
}

export async function make_active(params: ParamsType) {
  const { ...restParams } = params;
  return request("/api/tests/" + params.id, {
    method: "PUT",
    data: { status: "active" },
  });
}

export async function updateStatusAction(params: ParamsType) {

  return request("/api/tests/" + params.id, {
    method: "PUT",
    data: { status: params.status },
  });
}
