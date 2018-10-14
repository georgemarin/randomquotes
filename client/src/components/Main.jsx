import React, { Component } from 'react';
import SimpleCard from "./SimpleCard";
import Grid from "@material-ui/core/Grid/Grid";

class Main extends Component {
  render () {
    return (
      <div style={{ display: 'table', position: 'absolute', height: '100%', width: '100%', backgroundColor: '#002b38' }}>
        <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
          <div className=".col-md-12" style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <SimpleCard
                author="George"
                quote="plm"
              />
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
