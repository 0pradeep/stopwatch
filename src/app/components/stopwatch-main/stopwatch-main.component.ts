import { Component, OnInit } from '@angular/core';
import { TimerRecord } from 'src/app/models/TimerRecord';
import { timer } from 'rxjs';
import { TimerTable } from 'src/app/models/TimerTable';

@Component({
  selector: 'app-stopwatch-main',
  templateUrl: './stopwatch-main.component.html',
  styleUrls: ['./stopwatch-main.component.css']
})
export class StopwatchMainComponent implements OnInit {

  timerRecord: TimerRecord[];
  displayedColumns: string[] = ['id', 'trackRecord', 'type'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  isTimerRunning: boolean = false;
  millisecs: number = 0;
  time: number = 0;
  sTime: number = 0;
  startStopField: string = 'Start';
  stopwatchTimer: string;
  iFirst: boolean = true;
  enableReset: boolean = false;
  splitRunning: boolean = false;
  pauseTime: string = '000';
  iPaused: boolean = false;
  timerTable: TimerTable[];

  startText = 'Start';
  laps: any = [];
  counter: number;
  splitCounter: number;
  timerRef;
  splitTimerRef;
  clock: any;
  minutes: any = '00';
  seconds: any = '00';
  hours: any = '00';
  milliseconds: any = '000';
  isSplitTimerRunning: boolean = false;
  startStopText: string = 'Start';
  splitTime: string;
  splitTime1: string = '00 : 00 : 00 : 000';

  sHours: any = '00';
  sMinutes: any = '00';
  sSeconds: any = '00';
  sMilliSeconds: any = '000';

  constructor() { }

  ngOnInit(): void {
    this.timerTable = [];
    this.resetToInitialTime();
    this.resetSplitTime();
    // timer(0, 1).subscribe(() => {
    //   if (this.isTimerRunning)
    //     this.millisecs++;
    // })
    // timer(0, 1000).subscribe(() => {
    //   if (this.isTimerRunning)
    //     this.time++;
    //   this.stopwatchTimer = this.formatTimer(this.time);
    //   if (this.sTime === -1) this.splitTime = this.stopwatchTimer;
    // });
    // timer(0, 1000).subscribe(() => {
    //   if (this.isTimerRunning)
    //     this.sTime++;
    //   this.splitTime = this.formatTimer(this.sTime);
    // });
  }

  formatTimer(time: number): string {
    let hrs = '0' + Math.floor(time / 3600);
    let mins = '0' + Math.floor(time % 3600 / 60);
    let secs = '0' + Math.floor(time % 3600 % 60);
    let ms = '0' + this.millisecs % 1000;
    if (this.splitRunning) {
      this.splitRunning = false;
      ms = '000';
    } else if (this.iPaused) {
      // this.iPaused = false;
      ms = this.pauseTime;
    }
    let timeString = hrs.slice(-2, -1) + hrs.slice(-1) + ': '
      + mins.slice(-2, -1) + mins.slice(-1) + ': '
      + secs.slice(-2, -1) + secs.slice(-1) + ': '
      + ms.slice(-3, -2) + ms.slice(-2, -1) + ms.slice(-1);
    return timeString;
  }

  getSplitTime(): void {
    this.sTime = 0;
    this.splitRunning = true;
    // this.splitTime = this.stopwatchTimer;
    let id = this.timerTable.length + 1;
    this.timerTable.unshift({
      id: id,
      trackRecord: this.splitTime,
      type: 'Split'
    });
    this.resetSplitTime();
  }

  resetToInitialTime(): void {
    this.stopwatchTimer = this.resetTime();
  }

  resetSplitTime(): void {
    this.splitTime = this.resetTime();
  }

  resetTime(): string {
    return '00 : 00 : 00 : 000';
  }

  pauseTimer(): void {
    this.pauseTime = this.stopwatchTimer.slice(8);
    this.iPaused = true;
    let id = this.timerTable.length + 1;
    this.timerTable.unshift({
      id: id,
      trackRecord: this.stopwatchTimer,
      type: 'Pause'
    });
  }

  toggleTimer(): void {
    this.iFirst = true;
    this.isTimerRunning = !this.isTimerRunning;
    if (this.isTimerRunning) {
      this.iPaused = false;
      this.startStopField = 'Stop';
    } else {
      if (this.iFirst = true) this.pauseTimer();
      this.startStopField = 'Start';
    }
    if (this.iFirst && !this.isTimerRunning) this.enableReset = true;
    console.log(this.stopwatchTimer);
  }

  toggleTimer1(): void {
    this.iFirst = false;
    this.isTimerRunning = !this.isTimerRunning;
    if (this.isTimerRunning) {
      this.toggleSplitTimer();
      this.startStopText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.milliseconds = Math.floor(Math.floor(this.counter % 1000)).toFixed(0);
        this.minutes = Math.floor(this.counter / 60000);
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        this.hours = Math.floor(this.counter / 600000);
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.milliseconds) < 100) {
          let apnd = '0';
          if (Number(this.milliseconds) < 10) apnd = '00';
          this.milliseconds = apnd + this.milliseconds;
        } else {
          this.milliseconds = '' + this.milliseconds;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
        if (Number(this.hours) < 10) {
          this.hours = '0' + this.hours;
        } else {
          this.hours = '' + this.hours;
        }
      });
    } else {
      this.toggleSplitTimer();
      this.startStopText = 'Start';
      clearInterval(this.timerRef);
    }
  }

  toggleSplitTimer() {
    this.isSplitTimerRunning = !this.isSplitTimerRunning;
    if (this.isSplitTimerRunning) {
      const startTime1 = Date.now() - (this.splitCounter || 0);
      this.splitTimerRef = setInterval(() => {
        this.splitCounter = Date.now() - startTime1;
        this.sMilliSeconds = Math.floor(Math.floor(this.splitCounter % 1000)).toFixed(0);
        this.sMinutes = Math.floor(this.splitCounter / 60000);
        this.sSeconds = Math.floor(Math.floor(this.splitCounter % 60000) / 1000).toFixed(0);
        this.sHours = Math.floor(this.splitCounter / 600000);
        if (Number(this.sMinutes) < 10) {
          this.sMinutes = '0' + this.sMinutes;
        } else {
          this.sMinutes = '' + this.sMinutes;
        }
        if (Number(this.sMilliSeconds) < 100) {
          let apnd = '0';
          if (Number(this.sMilliSeconds) < 10) apnd = '00';
          this.sMilliSeconds = apnd + this.sMilliSeconds;
        } else {
          this.sMilliSeconds = '' + this.sMilliSeconds;
        }
        if (Number(this.sSeconds) < 10) {
          this.sSeconds = '0' + this.sSeconds;
        } else {
          this.sSeconds = '' + this.sSeconds;
        }
        if (Number(this.sHours) < 10) {
          this.sHours = '0' + this.sHours;
        } else {
          this.sHours = '' + this.sHours;
        }
      });
    } else {
      clearInterval(this.splitTimerRef);
    }
  }

  clearTimer() {
    this.isTimerRunning = false;
    this.startText = 'Start';
    this.counter = undefined;
    this.milliseconds = '000';
    this.seconds = '00';
    this.minutes = '00';
    this.laps = [];
    clearInterval(this.timerRef);
  }

  resetTimer() {
    this.resetToInitialTime();
    this.resetSplitTime();
    this.timerTable.length = 0;
  }

  startTimer() {
    this.isTimerRunning = !this.isTimerRunning;
    if (this.isTimerRunning) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.milliseconds = Math.floor(Math.floor(this.counter % 1000) / 10).toFixed(0);
        this.minutes = Math.floor(this.counter / 60000);
        this.seconds = Math.floor(Math.floor(this.counter % 60000) / 1000).toFixed(0);
        if (Number(this.minutes) < 10) {
          this.minutes = '0' + this.minutes;
        } else {
          this.minutes = '' + this.minutes;
        }
        if (Number(this.milliseconds) < 10) {
          this.milliseconds = '0' + this.milliseconds;
        } else {
          this.milliseconds = '' + this.milliseconds;
        }
        if (Number(this.seconds) < 10) {
          this.seconds = '0' + this.seconds;
        } else {
          this.seconds = '' + this.seconds;
        }
      });
    } else {
      this.startText = 'Start';
      clearInterval(this.timerRef);
    }
  }
}
