import { Observable, combineLatest, map } from "rxjs";
import { ENTITY_STATE_VALUE, EntityState } from "./entity-state.type";
import { LoadingState } from "./loading-state.type";

export function createEntityState<S, R>(
  state$: Observable<S>,
  loadingState$: Observable<LoadingState>,
  selector: (state: S) => R,
): Observable<EntityState<R>> {
  return combineLatest([state$, loadingState$]).pipe(
    map(([state, loadingState]) => {
      if (loadingState.idle) {
        return { state: ENTITY_STATE_VALUE.IDLE };
      }

      if (loadingState.loading) {
        return { state: ENTITY_STATE_VALUE.LOADING };
      }

      if (loadingState.error) {
        return {
          state: ENTITY_STATE_VALUE.ERROR,
          error: loadingState.error,
        };
      }

      return { state: ENTITY_STATE_VALUE.SUCCESS, value: selector(state) };
    }),
  );
}
