import waitMilliseconds from './waitMilliseconds';

export default function waitSeconds(seconds: number) {
  return waitMilliseconds(seconds * 1000);
}
