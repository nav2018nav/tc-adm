export interface Data {
  id: string;
  city: string;
  name?: string;
  individuals_count?: string | number;
  province?: string;
  status: string;
}
export interface BasicStudentDetail {
  data: Data[];
}
