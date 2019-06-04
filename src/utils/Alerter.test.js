import { Alerter } from './Alerter';
import { Load } from './Load';

const aboveThresholdAverage = new Load({ value: 1.2, timestamp: Date.now() });
const belowThresholdAverage = new Load({ value: 0.6, timestamp: Date.now() });

it('constructs with no alerts', () => {
  const alerter = new Alerter();
  expect(alerter.alerts.length).toBe(0);
});

it('will add an alert if updated with an average higher than the threshold', () => {
  const alerter = new Alerter();
  alerter.updateWith(aboveThresholdAverage);

  expect(alerter.alerts.length).toBe(1);
});

it('will not add more alerts if updated with average higher than threshold, if previous alert is not resolved', () => {
  const alerter = new Alerter();
  alerter.updateWith(aboveThresholdAverage);
  alerter.updateWith(aboveThresholdAverage);
  alerter.updateWith(aboveThresholdAverage);

  expect(alerter.alerts.length).toBe(1);
});

it('will add an alert resolving high threshold alert if updated with alert lower than threshold', () => {
  const alerter = new Alerter();
  alerter.updateWith(aboveThresholdAverage);
  alerter.updateWith(belowThresholdAverage);

  expect(alerter.alerts.length).toBe(2);
});

it('will ignore null or undefined averages', () => {
  const alerter = new Alerter();
  alerter.updateWith(null);

  expect(alerter.alerts.length).toBe(0);
});
