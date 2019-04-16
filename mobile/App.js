import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: null,
      quotes: [],
    };
  };

  getQuote(quotes) {
    const r = Math.floor(Math.random() * quotes.length);
    this.setState({ quote: quotes[r] });
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://randomquotes2.herokuapp.com/api/quotes');
      const quotes = await response.json();
      this.setState({ quotes: quotes.quotes });
      this.getQuote(quotes.quotes);
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    const { quote, quotes } = this.state;
    return (
      <View style={styles.container}>
        <Card title='Random quotes'>
          <Text style={{marginBottom: 10}}>
            {quote ? quote.quote : 'Loading...'}
          </Text>
          <Text style={{marginBottom: 10}}>
            {quote ? quote.author : 'Loading...'}
          </Text>
          <Button
            onPress={() => this.getQuote(quotes)}
            loading={!quote}
            buttonStyle={styles.nextButton}
            title='NEXT'
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002b38',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 10,
    backgroundColor: '#3f51b5',
  },
});
