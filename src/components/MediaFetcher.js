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
        <Tabs>
          <TabList>
            <Tab>Reddit</Tab>
            <Tab>Instagram</Tab>
            <Tab>Youtube</Tab>
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
        </Tabs>
      </div>
    );
  }
}

export default MediaFetcher;

/*
class Component extends React.Component {
  constructor(props) {
    super(props);

    this.characters = {
      "Ant-Man": { img: "eec97ae821295f42e3969e082be11fac.png", color: "IndianRed", text: "white", desc: "\"I do some dumb things, and the people I love the most...they pay the price.\"" },
      "Black Widow": { img: "dc7c0d83df799ed15f34db84db753c2d.png", color: "SlateGrey", text: "white", desc: "\"After everything that happened with S.H.I.E.L.D., during my little hiatus, I went back to Russia and tried to find my parents. Two little graves linked by a chain fence. I pulled some weeds and left some flowers. We have what we have when we have it.\"" },
      "Captain America": { img: "4f8297f3fffb0d2e1c13ce33115ffb90.png", color: "RoyalBlue", text: "white", desc: "\"I'm not looking for forgiveness. And I'm way past asking for permission. Earth just lost their best defender. So we're here to fight. If you wanna stay in our way... we'll fight you, too.\"" },
      "Director Fury": { img: "00f135cda1d4ed226caaf27e9618a1e2.png", color: "Sienna", text: "white", desc: "\"Back in the day, I had eyes everywhere, ears everywhere else. Here we all are, back on earth, with nothing but our wit, and our will to save the world. So stand. Outwit the platinum bastard.\"" },
      Hawkeye: { img: "e9485cf3b0a42c3ba54cacd5434005d2.png", color: "MediumOrchid", text: "white", desc: "\"Just can't seem to miss.\"" },
      "Iron Man": { img: "6b5cc191fa84fcc51c24799c6dc37868.png", color: "LightCoral", text: "black", desc: "\"My armor was never a distraction or a hobby. It was a cocoon. And now I'm a changed man. You can take away my house, all my tricks and toys. But one thing you can't take away... I am Iron Man.\"" },
      Loki: { img: "600d5d43a0656a727d94daed3eae7b63.png", color: "LightGreen", text: "black", desc: "\"I, Loki, Prince of Asgard, Odinson, the rightful King of Jotunheim, God of Mischief, do hereby pledge to you, my undying fidelity.\"" },
      Thor: { img: "937edaf1f5a053fee90516eb7afcd976.png", color: "SkyBlue", text: "black", desc: "\"You know I’m 1500 years old. I’ve killed twice as many enemies as that. And every one of them would have rather killed me than not succeeded. I’m only alive because fate wants me alive. Thanos is just the latest of a long line of bastards, and he’ll be the latest to feel my vengeance. Fate wills it so.\"" },
      "War Machine": { img: "fcfaa690ada0842b3c593cc649b9faf2.png", color: "LightGrey", text: "black", desc: "\"138 combat missions. That's how many I've flown, Tony. Every one of them could've been my last, but I flew 'em. Because the fight needed to be fought.\"" }
    };

    this.state = {
      "Ant-Man": true,
      "Black Widow": true,
      "Captain America": true,
      "Director Fury": false,
      Loki: false,
      Hawkeye: true,
      "Iron Man": true,
      Thor: true,
      "War Machine": true
    };

    this.handleCheckClicked = this.handleCheckClicked.bind(this);
  }

  handleCheckClicked(e) {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  render() {
    const links = [];
    const tabs = [];
    const tabPanels = [];

    Object.keys(this.characters).forEach(name => {
      links.push(
        <label key={name}>
          <input
            type="checkbox"
            checked={this.state[name]}
            name={name}
            onChange={this.handleCheckClicked}
          />
          {name}{" "}
        </label>
      );

      if (!this.state[name]) return;

      const { img, color: backgroundColor, text: color, desc } = this.characters[name];

      tabs.push(
        <Tab style={{ backgroundColor }} className="avengers-tab">
          <img src={img} alt={name} height="32" width="32" />
        </Tab>
      );

      tabPanels.push(
        <TabPanel style={{ backgroundColor, color }} className="avengers-tab-panel">
          {desc}
        </TabPanel>
      );
    });

    return (
      <div>
        <p>{links}</p>
        <Tabs
          selectedTabClassName="avengers-tab--selected"
          selectedTabPanelClassName="avengers-tab-panel--selected"
        >
          <TabList className="avengers-tab-list">{tabs}</TabList>
          {tabPanels}
        </Tabs>
      </div>
    );
  }
}

render(Component);
*/
