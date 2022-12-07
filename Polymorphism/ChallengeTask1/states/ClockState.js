export default class ClockState {
  constructor(commonState){
    this.classState = commonState;
  }
  clickMode(){
    this.classState.state = new this.classState.states.alarm(this.classState);
  }
  longClickMode() {
    this.classState.alarmState
      ? (this.classState.alarmState = false)
      : (this.classState.alarmState = true);
  }
  clickH(){
    this.classState.h < 23 ? (this.classState.h += 1) : (this.classState.h = 0); 
  }
  clickM() {
    this.classState.min < 59 ? (this.classState.min += 1) : (this.classState.min = 0);
  }
  tick() {
    if (this.classState.min < 59){
      this.classState.min += 1;
    } else {
      this.classState.min = 0;
      this.clickH();
    }
    if (this.classState.isAlarmTime() && this.classState.isAlarmOn())
      this.classState.state = new this.classState.states.bell(this.classState);
  }
  getCurrentMode(){
    return 'clock';
  }
}