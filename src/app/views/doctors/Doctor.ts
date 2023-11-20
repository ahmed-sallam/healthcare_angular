import { Specialization } from '../specializations/Specialization';

export type Doctor = {
  id: number;
  name: string;
  specialization: Specialization;
};
