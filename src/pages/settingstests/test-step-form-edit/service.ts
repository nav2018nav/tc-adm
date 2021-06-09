import request from "@/utils/request";

export async function fakeSubmitForm(params: any) {
  console.log(params);
  //return false;
  return request("/api/tests/" + params.test_id, {
    method: "PUT",
    data: params,
  });
}
export async function queryFakeList(params: ParamsType) {
  return request("/api/test", {
    params,
  });
}
export async function queryFakeCategory(params: ParamsType) {
  return request("/api/test-category", {
    params,
  });
}

export async function queryListTest(params?: TableListParams) {
  console.log("Params");
  console.log(params);
  //let exam_id = localStorage.getItem('exam_id');
  return request("/api/tests/" + params.test_id, {
    method: "GET",
    //data: params,
  });
}

export async function queryFakeQuestionsPractical(params: ParamsType) {
  console.log("queryFakeQuestionsPractical");
  console.log(params);

  // console.log(questionsType);
  return request("/api/questions?type=practical", {
    params,
  });
}

export async function queryFakeQuestionsPhysical(params: ParamsType) {
  console.log("queryFakeQuestionsPhysical");
  console.log(params);

  // console.log(questionsType);
  return request("/api/questions?type=physical", {
    params,
  });
}
