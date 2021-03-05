import { Component, OnInit } from '@angular/core';
import { TimerRecord } from 'src/app/models/TimerRecord';
import { timer } from 'rxjs';
import { TimerFormat, TimeDigits } from '../../models/TimerFormat';

@Component({
  selector: 'app-stopwatch-main',
  templateUrl: './stopwatch-main.component.html',
  styleUrls: ['./stopwatch-main.component.css']
})
export class StopwatchMainComponent implements OnInit {
  timerRecord: TimerRecord[];
  displayedColumns: string[] = ['id', 'trackRecord', 'type'];
  isTimerRunning: boolean = false;
  time: number = 0;
  stopwatchTimer: TimerFormat;
  initialTime: TimeDigits;
  constructor() { }

  ngOnInit(): void {
    this.resetToInitialTime();
    timer(0, 1000).subscribe(ellapsedTime => {
      if (this.isTimerRunning)
        this.time++;
      this.stopwatchTimer = this.formatTimer(this.time);
    });
  }

  formatTimer(time: number): TimerFormat {
    let hrs = '0' + Math.floor(time / 3600);
    let mins = '0' + Math.floor(time % 3600 / 60);
    let secs = '0' + Math.floor(time % 3600 % 60);

    return {
      hours: { d1: hrs.slice(-2, -1), d2: hrs.slice(-1) },
      minutes: { d1: mins.slice(-2, -1), d2: mins.slice(-1) },
      seconds: { d1: secs.slice(-2, -1), d2: secs.slice(-1) }
    };
  }

  resetToInitialTime(): void{
    this.initialTime = { d1: '0', d2: '0' };
    this.stopwatchTimer = {
      hours: this.initialTime,
      minutes: this.initialTime,
      seconds: { d1: '0', d2: '0' }
    }
  }

  toggleTimer(): void {
    this.isTimerRunning = !this.isTimerRunning;
    console.log(this.stopwatchTimer);

  }

}
