import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import { getElementWithChildViews } from '../store/elements/actions';

class ViewsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    }
  };

  componentDidMount() {
    let projectId = this.props.navigation.getParam('projectId');
    let viewId = this.props.navigation.getParam('viewId');

    this._setup(projectId, viewId);

    // Prepare for user to "go back" - add focus listener to reload this view
    this.props.navigation.addListener('didFocus', () => {
      this._setup(projectId, viewId);
    });
  }

  _setup(projectId, viewId) {
    this.projectId = projectId;
    this.viewId = viewId;
    this.props.getElementWithChildViews(this.projectId, this.viewId);
  }
  
  render() {
    if (!this.props.element.id) {
      return null;
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
          {
            this.props.element._childViewsWith.map(childView => {
              return (
                <Button
                  key={ childView.id }
                  title={ childView.name }
                  onPress={ () => {
                      this.props.navigation.navigate({ 
                        routeName: 'Views',
                        key: Math.random() * 10000,
                        params: {
                          projectId: this.projectId,
                          viewId: childView.id,
                          title: childView.name,
                        }
                      })
                    }
                  }
                />
              )})
            }
            <HTMLView value={this.props.element.documentation} stylesheet={htmlStyles} addLineBreaks={false}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const htmlStyles = StyleSheet.create({
  html: {
    fontSize: 16,
    marginLeft: 20,
    marginRight: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

function mapStateToProps(state) {
  return {
    element: state.elements.element
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getElementWithChildViews(projectId, elementId) {
      return dispatch(getElementWithChildViews(projectId, elementId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewsScreen)
