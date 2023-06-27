export const formatNumberWithUnit = function (
  value: number,
  unit: string,
): string {
  if (value == 0.0) {
    return '0 ' + unit;
  }
  if (Math.abs(value) < 10) {
    return value.toFixed(1) + ' ' + unit;
  } else {
    return value.toFixed(0) + ' ' + unit;
  }
};
