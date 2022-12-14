export default class AlarmState {
  constructor(commonState){
    this.classState = commonState;
  }
  clickMode(){
    this.classState.state = new this.classState.states.clock(this.classState);
  }
  longClickMode() {
    this.classState.alarmState
      ? (this.classState.alarmState = false)
      : (this.classState.alarmState = true);
  }
  clickH(){
    this.classState.alarmH < 23 ? (this.classState.alarmH += 1) : (this.classState.alarmH = 0); 
  }
  clickM() {
    this.classState.alarmMin < 59 ? (this.classState.alarmMin += 1) : (this.classState.alarmMin = 0);
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
    return 'alarm';
  }
}