import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SectionService {
  // currentSection stores the ID of the visible section
  private sectionSubject = new BehaviorSubject<string>('hero');
  currentSection$ = this.sectionSubject.asObservable();

  setCurrentSection(sectionId: string) {
    this.sectionSubject.next(sectionId);
  }
}
