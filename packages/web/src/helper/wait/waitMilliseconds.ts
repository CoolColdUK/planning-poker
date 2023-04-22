export default function waitMilliseconds(milliseconds: number) {
  return new Promise((res) => setTimeout(res, milliseconds));
}
