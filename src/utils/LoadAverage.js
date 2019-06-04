import { isNull } from 'lodash';
import { Load } from './Load';

export class LoadAverage {
  constructor(
    maxLoads,
    { resultsBeforeThreshold } = { resultsBeforeThreshold: true }
  ) {
    this.maxLoadsToHoldOnto = maxLoads || 600; // 10 minutes
    this.first = null;
    this.last = null;
    this.length = 0;
    this.total = 0;
    this.resultsBeforeThreshold = resultsBeforeThreshold;
  }

  add(load) {
    this.total = this.total + load.value;
    this.length++;

    if (!this.first && !this.last) {
      this.last = load;
      this.first = load;
      this.length = 1;
      return;
    }

    const currentFirst = this.first;
    currentFirst.previous = load;
    load.next = currentFirst;
    this.first = load;

    if (this.hasTooManyLoads()) {
      this.total = this.total - this.last.value;
      this.last = this.last.previous;
      this.length--;
    }
  }

  value() {
    return this.isReadyForAverage() ? this.total / this.length : null;
  }

  valueAsLoad() {
    if (!this.isReadyForAverage()) return null;

    return new Load({ value: this.value(), timestamp: this.first.timestamp });
  }

  isAtMaxLength() {
    return this.length === this.maxLoadsToHoldOnto;
  }

  hasTooManyLoads() {
    return this.length > this.maxLoadsToHoldOnto;
  }

  isReadyForAverage() {
    if (this.length === 0) return false;

    return this.resultsBeforeThreshold ? true : this.isAtMaxLength();
  }
}
