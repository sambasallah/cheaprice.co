import React from 'react';
export default class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXml(`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" />

<url>
  <loc>https://cheaprice.co/</loc>
  <lastmod>2020-08-26T18:08:50+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://cheaprice.co/deals</loc>
  <lastmod>2020-08-26T18:08:50+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://cheaprice.co/privacy</loc>
  <lastmod>2020-08-26T18:08:50+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://cheaprice.co/faqs</loc>
  <lastmod>2020-08-26T18:08:50+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://cheaprice.co/contact</loc>
  <lastmod>2020-08-26T18:08:50+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://cheaprice.co/tracking</loc>
  <lastmod>2020-08-26T18:08:50+00:00</lastmod>
  <priority>0.80</priority>
</url>


</urlset>
    `));
    res.end();
  }
}




