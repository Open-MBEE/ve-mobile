import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Right,
} from 'native-base';

import { getAllProjects } from '../store/projects/actions';

class ProjectsScreen extends Component {
  static navigationOptions = {
    title: 'Projects',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllProjects();
  }

  render() {
    if (!this.props.projects.length) {
      return null;
    }

    return (
      <Container>
        <Content>
          <List
            dataArray={this.props.projects}
            renderRow={project =>
              <ListItem
                onPress={ () => this.props.navigation.navigate('Documents', { projectId: project._projectId }) } >
                <Left>
                  <Text>
                    {project.name}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
            />
          </Content>
        </Container>
    );
  }
}

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
    projects: state.projects.projects
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllProjects() {
      dispatch(getAllProjects())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen)
