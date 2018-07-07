import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { getExampleElement } from '../store/elements/actions';

class LinksScreen extends Component {
  static navigationOptions = {
    title: 'Links',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getExampleElement()
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

function mapStateToProps(state) {
  return {
    exampleElement: state.elements.exampleElement
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getExampleElement() {
      dispatch(getExampleElement())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinksScreen)
