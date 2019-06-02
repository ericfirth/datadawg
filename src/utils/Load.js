export default class Load {
  constructor({ value, timestamp }) {
    this.value = value;
    this.timestamp = timestamp;
  }

  valueString() {
    return this.value.toLocaleString(undefined, { maximumSignificantDigits: 3 });
  }

  asPercent() {
    return this.value.toLocaleString(undefined, {
      style: 'percent',
      maximumSignificantDigits: 2,
    });
  }

  date() {
    return new Date(this.timestamp);
  }
}
