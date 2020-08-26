import React from 'react';
import SiteMapXML from './sitemap';
export default class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader("Content-Type", "text/xml");
    res.write(SiteMapXML);
    res.end();
  }
}




