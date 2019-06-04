import { Alert } from './Alert';

export class Alerter {
  constructor(alerts = []) {
    this.alerts = alerts;
    this.alerting = false;
    this.twoMinuteAverage = null;
  }

  updateWith(newTwoMinuteAverage) {
    this.twoMinuteAverage = newTwoMinuteAverage;
    if (!this.twoMinuteAverage) return;

    this.createNewAboveThresholdAlertIfNeeded();

    this.createNewBelowThresholdAlertIfNeeded();
  }

  createNewBelowThresholdAlertIfNeeded() {
    if (this.alerting && this.twoMinuteAverageValue() < 1) {
      this.alerting = false;
      const alert = new Alert(this.twoMinuteAverage, 'below');
      this.addAlert(alert);
    }
  }

  createNewAboveThresholdAlertIfNeeded() {
    if (!this.alerting && this.twoMinuteAverageValue() > 1) {
      this.alerting = true;
      const alert = new Alert(this.twoMinuteAverage, 'above');
      this.addAlert(alert);
    }
  }

  addAlert(alert) {
    this.alerts = [alert, ...this.alerts];
  }

  twoMinuteAverageValue() {
    return this.twoMinuteAverage ? this.twoMinuteAverage.value : 0;
  }
}
