import { DurationWithSecondsPipe } from './duration-with-seconds.pipe';

describe('DurationWithSecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new DurationWithSecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
