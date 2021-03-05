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
  splitTime: string;
  iFirst: boolean = false;
  enableReset: boolean = false;
  splitRunning: boolean = false;
  pauseTime: string = '000';
  iPaused: boolean = false;
  timerTable: TimerTable[];

  constructor() { }

  ngOnInit(): void {
    this.timerTable = [];
    this.resetToInitialTime();
    this.resetSplitTime();
    timer(0, 1).subscribe(() => {
      if (this.isTimerRunning)
        this.millisecs++;
    })
    timer(0, 1000).subscribe(() => {
      if (this.isTimerRunning)
        this.time++;
      this.stopwatchTimer = this.formatTimer(this.time);
      if (this.sTime === -1) this.splitTime = this.stopwatchTimer;
    });
    timer(0, 1000).subscribe(() => {
      if (this.isTimerRunning)
        this.sTime++;
      this.splitTime = this.formatTimer(this.sTime);
    });
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

  resetTimer() {
    this.resetToInitialTime();
    this.resetSplitTime();
    this.timerTable.length = 0;
  }

}
