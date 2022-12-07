import AlarmState from './states/AlarmState.js';
import BellState from './states/BellState.js';
import ClockState from './states/ClockState.js'

class AlarmClock {
  constructor(){
    this.min = 34;
    this.h = 0;
    this.alarmMin = 35;
    this.alarmH = 0;
    this.states = {
      alarm: AlarmState,
      bell: BellState,
      clock: ClockState,
    }
    this.state = new this.states.clock(this);
    this.alarmState = false;
  }
  clickMode() {
    this.state.clickMode(this);
  }
  longClickMode() {
    this.state.longClickMode(this);
  }
  clickH(){
    this.state.clickH(this);
  }
  clickM(){
    this.state.clickM(this);
  }
  tick(){
    this.state.tick(this);
  }
  isAlarmOn(){
    return this.alarmState;
  }
  isAlarmTime(){
    return this.h === this.alarmH && this.min === this.alarmMin;
  }
  minutes(){
    return this.min;
  }
  hours(){
    return this.h;
  }
  alarmMinutes(){
    return this.alarmMin;
  }
  alarmHours(){
    return this.alarmH;
  }
  getCurrentMode(){
    return this.state.getCurrentMode();
  }
  console(){
    console.log(this);
  }
}

const test = new AlarmClock;

const nowTime = (alarmClock) => {
  console.log(`${alarmClock.hours()}:${alarmClock.minutes()}`);
}

const alarmTime = (alarmClock) => {
  console.log(`${alarmClock.alarmHours()}:${alarmClock.alarmMinutes()}`);
}

nowTime(test);
alarmTime(test);

test.longClickMode();
test.tick();
console.log(test.getCurrentMode());

nowTime(test);
alarmTime(test);

// console.log(test.getCurrentMode());
// test.clickMode();
// console.log(test.getCurrentMode());
// test.clickMode();
// console.log(test.getCurrentMode());
// test.longClickMode();
// console.log(test.isAlarmOn());
// test.longClickMode();
// console.log(test.isAlarmOn());
// test.clickM();
// test.clickH();
// console.log(test.hours());
// console.log(test.minutes());
// test.clickMode();
// console.log(test.getCurrentMode());
// test.clickM();
// test.clickM();
// test.clickH();
// test.clickH();
// console.log(test.alarmHours());
// console.log(test.alarmMinutes());
// test.clickMode();


// clickMode() - нажатие на кнопку Mode
// longClickMode() - долгое нажатие на кнопку Mode
// clickH() - нажатие на кнопку H
// clickM() - нажатие на кнопку M
// tick() - при вызове увеличивает время на одну минуту и, если нужно, активирует звонок будильника
// isAlarmOn() - показывает активирован ли будильник
// isAlarmTime() - возвращает true, если время на часах совпадает со временем на будильнике
// minutes() - возвращает минуты, установленные на часах
// hours() - возвращает часы, установленные на часах
// alarmMinutes() - возвращает минуты, установленные на будильнике
// alarmHours() - возвращает часы, установленные на будильнике
// getCurrentMode() - возвращает текущий режим (alarm | clock | bell)
