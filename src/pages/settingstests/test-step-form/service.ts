import request from "@/utils/request";

export async function fakeSubmitForm(params: any) {
  return request("/api/tests", {
    method: "POST",
    data: params,
  });
}
export async function queryFakeList(params: ParamsType) {
  return request("/api/test-category", {
    params,
  });
}
export async function fetchquetionslist(params: ParamsType) {
  return request("/api/questions", {
    params,
  });
}

export async function queryFakeQuestionsPractical(params: ParamsType) {
  // console.log(questionsType);
  return request("/api/questions?type=practical", {
    params,
  });
}

export async function queryFakeQuestionsPhysical(params: ParamsType) {
  // console.log(questionsType);
  return request("/api/questions?type=physical", {
    params,
  });
}
