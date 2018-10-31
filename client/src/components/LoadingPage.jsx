import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import {SyncLoader} from "react-spinners";

class LoadingPage extends React.Component {

  render() {
    return (
      <div
        style={{display: 'table', position: 'absolute', height: '100%', width: '100%', backgroundColor: '#002b38'}}>
        <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
          <div className=".col-md-12" style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <SyncLoader
                sizeUnit={"px"}
                size={35}
                color={'white'}
                loading={true}
              />
            </Grid>
          </div>
        </div>
      </div>
    )
  }

}

export default LoadingPage;