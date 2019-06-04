export class Load {
  constructor({ value, timestamp }) {
    this.value = value;
    this.timestamp = timestamp;
  }

  asPercent() {
    return this.value.toLocaleString(undefined, {
      style: 'percent',
      maximumSignificantDigits: 2,
    });
  }

  dateString() {
    return new Date(this.timestamp).toLocaleString();
  }
}
