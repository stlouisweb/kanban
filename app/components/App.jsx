import AltContainer from 'alt-container';
import React from 'react';

import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


@DragDropContext(HTML5Backend)
export default class App extends React.Component {

  render() {

    return (
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Clippery</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={this.addLane}>Add Category</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div>
              <AltContainer
                stores={[LaneStore]}
                inject={{
                  lanes: () => LaneStore.getState().lanes || []
                }}
              >
              <Lanes />
            </AltContainer>
        </div>
      </div>
    );
  }

  addLane() {
    LaneActions.create({name: 'New lane'});
  }

}
