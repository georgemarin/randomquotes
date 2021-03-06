import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SimpleCard from "./SimpleCard";
import Grid from "@material-ui/core/Grid/Grid";

class Main extends Component {
  static propTypes = {
    quotes: PropTypes.object.isRequired,
    quotesActions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.quotesActions.fetchQuotes();
    this.state = {
      quote: {},
    };
  };

  render () {
    if (!this.props.quotes.hasLoaded) {
      return (<div>Loading data...</div>);
    }

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
                  quotes={this.props.quotes.quotes}
                  updateQuote={this.props.quotesActions.updateQuote}
              />
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ quotes }) => ({ quotes });
const mapDispatch = ({ quotes }) => ({
  quotesActions: quotes,
});

export default connect(mapState, mapDispatch)(Main);
