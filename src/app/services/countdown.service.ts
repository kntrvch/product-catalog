import { Injectable } from '@angular/core';
import { interval, map, Observable, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  getCountdownToMidnight(): Observable<string> {
    return interval(1000).pipe(
      map(() => this.calculateTimeRemaining()),
      takeWhile((time) => time.totalSeconds > 0),
      map((time) => `${time.hours}h ${time.minutes}m ${time.seconds}s`)
    );
  }

  private calculateTimeRemaining() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const totalSeconds = Math.floor(
      (midnight.getTime() - now.getTime()) / 1000
    );
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { totalSeconds, hours, minutes, seconds };
  }
}
