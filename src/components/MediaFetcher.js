import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Reddit from './Reddit';
import Instagram from './Instagram';
import Youtube from './Youtube';
import Welcome from './Welcome';

class MediaFetcher extends Component {
  render() {
    return (
      <div className="outer-container">
        <Tabs>
          <TabList>
            <Tab>Welcome</Tab>
            <Tab>Reddit</Tab>
            <Tab>Instagram</Tab>
            <Tab>Youtube</Tab>
          </TabList>

          <TabPanel>
            <Welcome />
          </TabPanel>

          <TabPanel>
            <Reddit />
          </TabPanel>

          <TabPanel>
            <Instagram />
          </TabPanel>

          <TabPanel>
            <Youtube />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default MediaFetcher;