import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      quote: null,
      quotes: [],
      isLikePressed: false,
      isDislikePressed: false,
    };
  };

  getQuote (quotes) {
    const r = Math.floor(Math.random() * quotes.length);
    this.setState({quote: quotes[ r ], isLikePressed: false, isDislikePressed: false});
  }

  async componentDidMount () {
    try {
      const response = await fetch('https://randomquotes2.herokuapp.com/api/quotes');
      const quotes = await response.json();
      this.setState({quotes: quotes.quotes});
      this.getQuote(quotes.quotes);
    } catch (ex) {
      console.log(ex);
    }
  }

  updateQuote (id, newQuote) {
    try {
      fetch(`https://randomquotes2.herokuapp.com/api/quote/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({quote: newQuote}),
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  onLikePress () {
    const {quote, isLikePressed, isDislikePressed} = this.state;
    const newQuote = Object.assign({}, quote);
    delete newQuote._id;
    if (isDislikePressed) {
      this.setState({ isLikePressed: true });
      newQuote.likes = quote.likes + 2;
    } else if (isLikePressed) {
      newQuote.likes = quote.likes - 1;
      this.setState({isLikePressed: false});
    } else {
      newQuote.likes = quote.likes + 1;
      this.setState({isLikePressed: true});
    }
    this.updateQuote(quote._id, newQuote);
    this.setState({quote: {_id: quote._id, ...newQuote}, isDislikePressed: false});
  }

  onDislikePress () {
    const {quote, isDislikePressed, isLikePressed} = this.state;
    const newQuote = Object.assign({}, quote);
    delete newQuote._id;
    if (isLikePressed) {
      newQuote.likes = quote.likes - 2;
      this.setState({ isDislikePressed: true });
    } else if (isDislikePressed) {
      newQuote.likes = quote.likes + 1;
      this.setState({isDislikePressed: false});
    } else {
      newQuote.likes = quote.likes - 1;
      this.setState({isDislikePressed: true});
    }
    this.updateQuote(quote._id, newQuote);
    this.setState({quote: {_id: quote._id, ...newQuote}, isLikePressed: false});
  }

  render () {
    const { quote, quotes } = this.state;
    return (
      <View style={styles.container}>
        <Card title='Random quotes'>
          <Text style={styles.quoteText}>
            {quote ? quote.quote : 'Loading...'}
          </Text>
          <Text style={styles.authorText}>
            {quote ? quote.author : ''}
          </Text>
          <Text style={styles.authorText}>
            Likes: {quote ? quote.likes : ''}
          </Text>
          <Button
            onPress={() => this.getQuote(quotes)}
            loading={!quote}
            buttonStyle={styles.nextButton}
            title='NEXT'
          />
        </Card>
        <View style={styles.actionsContainer}>
          {this.state.isLikePressed ? (
            <Icon
              name="thumbs-up"
              color="#3f51b5"
              size={35}
              onPress={() => this.onLikePress()}
            /> ) : (
            <Icon
              name="thumbs-up"
              color="white"
              size={35}
              onPress={() => this.onLikePress()}
            /> )
          }
          <View style={{width: 20}}/>
          {this.state.isDislikePressed ? (
            <Icon
              name="thumbs-down"
              color="red"
              size={35}
              onPress={() => this.onDislikePress()}
            /> ) : (
            <Icon
              name="thumbs-down"
              color="white"
              size={35}
              onPress={() => this.onDislikePress()}
            /> )
          }
        </View>
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
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: -225,
    justifyContent: 'space-between',
  },
  nextButton: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 10,
    backgroundColor: '#3f51b5',
  },
  quoteText: {
    marginBottom: 10,
    fontSize: 22,
  },
  authorText: {
    textAlign: 'right',
    marginBottom: 10,
  },
});
