class Load {
  constructor({ value, timestamp }) {
    this.value = value;
    this.timestamp = timestamp;
  }

  valueString() {
    return this.value.toLocaleString(undefined, { maximumSignificantDigits: 3 });
  }
}
