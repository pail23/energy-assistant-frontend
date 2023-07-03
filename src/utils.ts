export const formatNumberWithUnit = function (
  value: number,
  unit: string,
): string {
  if (value == 0.0) {
    return '0 ' + unit;
  }
  if (Math.abs(value) < 10) {
    if (Math.abs(value) < 1 && unit == 'kWh') {
      return (value * 1000).toFixed(0) + ' Wh';
    }
    return value.toFixed(1) + ' ' + unit;
  } else {
    return value.toFixed(0) + ' ' + unit;
  }
};
