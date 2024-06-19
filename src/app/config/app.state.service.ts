import { Injectable, signal } from '@angular/core';

export type AppState = {

}

const initialState = {

}

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor() { }


  private state = signal<AppState>(initialState);

  $value = this.state.asReadonly();


}
