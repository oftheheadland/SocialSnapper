import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Reddit from "./Reddit";
import Instagram from "./Instagram";
import Youtube from "./Youtube";
import Twitch from "./Twitch";
import Welcome from "./Welcome";

class MediaFetcher extends Component {
  render() {
    return (
      <div className="outer-container">
        <Welcome />
        <Tabs>
          <TabList>
            <Tab>
              <i className="fab fa-reddit-alien" /> Reddit
            </Tab>
            <Tab>
              <i className="fab fa-instagram" /> Instagram
            </Tab>
            <Tab>
              <i className="fab fa-youtube" /> YouTube
            </Tab>
            <Tab>
              <i className="fab fa-twitch" /> Twitch
            </Tab>
          </TabList>

          <TabPanel>
            <Reddit />
          </TabPanel>

          <TabPanel>
            <Instagram />
          </TabPanel>

          <TabPanel>
            <Youtube />
          </TabPanel>

          <TabPanel>
            <Twitch />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default MediaFetcher;
