import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Reddit from './Reddit';
import Instagram from './Instagram';
import Youtube from './Youtube';

class MediaFetcher extends Component {
  render() {
    return (
      <div className="outer-container">
        {/* TODO: https://reactcommunity.org/react-tabs/ style and color the tabs, generate them. only 3 so maybe no necessary to generate but at least style them 
    and give them icons don't use trademarked icons */}

        <Tabs>
          <TabList>
            <Tab>Reddit</Tab>
            <Tab>Instagram</Tab>
            <Tab>Youtube</Tab>
          </TabList>

          {/* reddit tab */}
          <TabPanel>
            <Reddit />
          </TabPanel>

          {/* instagram panel */}
          <TabPanel>
            <Instagram />
          </TabPanel>

          {/* youtube panel */}
          <TabPanel>
            <Youtube />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default MediaFetcher;
