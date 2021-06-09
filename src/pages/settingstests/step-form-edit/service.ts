import request from "@/utils/request";

export async function fakeSubmitForm(params: any) {
  console.log(params);

  let arr = {};
  if (params.measure1) {
    arr["measure1"] = params.measure1;
  }
  if (params.measure1_maxscore) {
    arr["measure1_maxscore"] = params.measure1_maxscore;
  }
  if (params.measure2) {
    arr["measure2"] = params.measure2;
  }

  if (params.measure2_maxscore) {
    arr["measure2_maxscore"] = params.measure2_maxscore;
  }
  if (params.measure3) {
    arr["measure3"] = params.measure3;
  }
  if (params.measure3_maxscore) {
    arr["measure3_maxscore"] = params.measure3_maxscore;
  }
  if (params.measure4) {
    arr["measure4"] = params.measure4;
  }
  if (params.measure4_maxscore) {
    arr["measure4_maxscore"] = params.measure4_maxscore;
  }

  params["measure"] = arr;

  delete params.measure1;
  delete params.measure1_maxscore;
  delete params.measure2;
  delete params.measure2;
  delete params.measure2_maxscore;
  delete params.measure3;
  delete params.measure3_maxscore;
  delete params.measure4;
  delete params.measure4_maxscore;

  console.log(params);

  //return false;
  return request("/api/questions/" + params.question_id, {
    method: "PUT",
    data: params,
  });
}

export async function queryFakeList(params: ParamsType) {
  return request("/api/test-category", {
    params,
  });
}

export async function queryListQuestion(params?: TableListParams) {
  //let exam_id = localStorage.getItem('exam_id');
  return request("/api/questions/" + params.question_id, {
    method: "GET",
    //data: params,
  });
}
