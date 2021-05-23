const TEMPERATURE_MIN = 36.1
const TEMPERATURE_MAX = 37.2
const O2SAT_MIN = 90
const O2SAT_MAX = 100
const SYSTOLIC_MIN = 120
const SYSTOLIC_MAX = 140
const DIASTOLIC_MIN = 80
const DIASTOLIC_MAX = 90


function between(value, min, max) {
  return value >= min && value <= max;
}

export const isNormalBodyTemp = (value) => between(value, TEMPERATURE_MIN, TEMPERATURE_MAX);
export const isNormalO2Sat = (value) => between(value, O2SAT_MIN, O2SAT_MAX);
export const isNormalSystolic= (value) => between(value, SYSTOLIC_MIN, SYSTOLIC_MAX);
export const isNormalDiastolic = (value) => between(value, DIASTOLIC_MIN, DIASTOLIC_MAX);
