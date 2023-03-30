export class UtilsService {
  convertMinutesToTime(minutes) {
    const m = minutes % 60;
    const h = (minutes - m) / 60;
    const HHMM = `${(h < 10 ? '0' : '') + h.toString()}:${m < 10 ? '0' : ''}${m.toString()}`;
    return HHMM;
  }

  generateRandom(min, max, except) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return except.includes(num) ? this.generateRandom(min, max) : num;
  }
}
