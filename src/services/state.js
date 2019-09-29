import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

class AppState {
  @observable repos = [];
  @observable github = null;
}

export const State = new AppState();

export function withState(ComposedComponent) {
  return class extends React.Component {
    static navigationOptions = ComposedComponent.navigationOptions;
    render() {
      const AssignState = observer(({appState}) => (
        <ComposedComponent {...this.props} appState={appState} />
      ));
      return <AssignState appState={State} />;
    }
  };
}
