import { isNull } from 'lodash';

class LoadAverage {
  constructor(maxLoads, canMakeAverageEarly = false) {
    this.maxLoadsToHoldOnto = maxLoads || 600; // 10 minutes
    this.first = null;
    this.last = null;
    this.length = 0;
    this.total = 0;
    this.canMakeAverageEarly = canMakeAverageEarly;
  }

  add(load) {
    this.total = this.total + load.value;
    this.length++;

    if (!this.last && !this.last) {
      this.last = load;
      this.first = load;
      this.length = 1;
      return;
    }

    const currentFirst = this.first;
    currentFirst.previous = load;
    load.next = currentFirst;
    this.first = load;

    if (this.isAtMaxLength()) {
      this.total = this.total - this.last.value;
      this.last = this.last.previous;
      this.length--;
    }
  }

  value() {
    return this.isReadyForAverage() ? this.total / this.length : null;
  }

  higherThan(number) {
    if (isNull(this.average())) return false;
    return this.average() > number;
  }

  lowerThan(number) {
    if (isNull(this.average())) return false;
    return this.average() < number;
  }

  isAtMaxLength() {
    return this.length >= this.maxLoadsToHoldOnto;
  }

  isReadyForAverage() {
    if (this.length === 0) return false;

    return this.canMakeAverageEarly ? true : this.isAtMaxLength();
  }
}

export default LoadAverager;
