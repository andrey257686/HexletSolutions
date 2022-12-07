export default class BellState {
  constructor(commonState){
    this.classState = commonState;
  }
  clickMode() {
    this.classState.state = new this.classState.states.clock(this.classState);
  }
  longClickMode() {
    this.classState.state = new this.classState.states.clock(this.classState);
  }
  clickH() {
    return;
  }
  clickM() {
    return;
  }
  tick(){
    this.classState.state = new this.classState.states.clock(this.classState);
    if (this.classState.min < 59) {
      this.classState.min += 1;
    } else {
      this.classState.min = 0;
      this.classState.h < 23 ? (this.classState.h += 1) : (this.classState.h = 0);
    }
  }
  getCurrentMode(){
    return 'bell';
  }
}