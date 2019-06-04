import { LoadAverage } from './LoadAverage';
import { Load } from './Load';

const loadWith = value => new Load({ value, timestamp: Date.now() });

it('averages loads given', () => {
  const loadAvg = new LoadAverage(10);
  loadAvg.add(loadWith(1));
  loadAvg.add(loadWith(3));

  expect(loadAvg.value()).toBe(2);
});

it('takes a max loads and will average only last max loads', () => {
  const loadAvg = new LoadAverage(2);
  loadAvg.add(loadWith(0));
  loadAvg.add(loadWith(0));
  loadAvg.add(loadWith(10));

  expect(loadAvg.value()).toBe(5);
});

it('can wait until it has max loads to begin averaging', () => {
  const loadAvg = new LoadAverage(100, { resultsBeforeThreshold: false });
  loadAvg.add(loadWith(10));

  expect(loadAvg.value()).toBe(null);
});
