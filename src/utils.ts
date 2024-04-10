export const formatNumberWithUnit = function (value: number, unit: string): string {
  if (value == null) {
    return '';
  }
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

function padWithLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, '0');
}

export const formatDuration = function (total_seconds: number): string {
  let diff = total_seconds;

  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;

  const mins = Math.floor(diff / 60);
  diff -= mins * 60;

  const seconds = Math.floor(diff);

  return padWithLeadingZeros(hours, 2) + ':' + padWithLeadingZeros(mins, 2) + ':' + padWithLeadingZeros(seconds, 2);
};
