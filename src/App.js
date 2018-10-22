import React, { Component } from 'react';
import ViewerTemplate from './components/ViewerTemplate';
import SpaceNavigator from './components/SpaceNavagator';
import Viewer from './components/Viewer';
import * as api from './lib/api';

class App extends Component {
  state = {
    loading: false,
    maxDate: null,
    date: null,
    url: null,
    mediaType: null
  }

  getAPOD = async (data) => {
    if(this.state.loading) return; // 이미 요청중이라면 무시

    // 로딩 상태 시작
    this.setState({
      loading: true
    });

    try {
      const response = await api.getAPOD(data);
      const {date: retrievedDate, url, media_type: mediaType} = response.data;

      if(!this.state.maxDate) {
        this.setState({
          maxDate: retrievedDate
        })
      }

      this.setState({
        date: retrievedDate,
        mediaType,
        url
      });
      console.log(response);
    } catch(e) {
      console.log(e);
    }

    // 로딩 상태 종료
    this.setState({
      loading: false
    });
  }

  componentDidMount() {
    this.getAPOD();
  }

  render() {
    const {url, mediaType, loading} = this.state;

    return (
      <ViewerTemplate
        spaceNavigator={<SpaceNavigator/>}
        viewer={(
          <Viewer
            url={url}
            mediaType={mediaType}
            loading={loading}
          />
        )}
      />
    );
  }
}

export default App;
