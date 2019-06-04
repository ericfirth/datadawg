export class Alert {
  constructor(average, type) {
    this.average = average;
    this.type = type;
  }

  loggedAt() {
    return this.average.dateString();
  }

  load() {
    return this.average.asPercent();
  }
}
