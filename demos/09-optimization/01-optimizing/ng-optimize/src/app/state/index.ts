import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ApplicationInsightsService } from '../shared/logging/app-insights.service';
import { appReducer, AppState } from './app.reducer';
import { RouterStateUrl } from './router.reducer';

export interface State {
  app: AppState;
  routerReducer: RouterReducerState<RouterStateUrl>;
}

export function logNgRX(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('ngrx logging:', action);
    if (environment.appInsights) {
      const ai = ApplicationInsightsService.getInstance()
      ai.trackEvent({ name: 'ngrx logging', properties: { action: action.type, state: state } });

    }
    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer,
  routerReducer: routerReducer,
};

export const metaReducers: MetaReducer<State>[] = environment.logNgRx
  ? [logNgRX]
  : [];

