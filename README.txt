The main HTML page requested by the browser is /dashboard.html this page directly corresponds to dashboard.jade, and
gets it's header from layout.jade.  scripts.js provides javascript for this HTML page, and style.css provides styles.
The paragraphs are stored in the files text1.txt, text2.txt, and text3.txt, and they get their formatting from paragraph.jade

All database functions are in database.js. runquery runs queries, postdata handles post requests, request json, is a
wrapper that converts the result of runquery to JSON, and the rest of the functions are wrappers for requestJSON to
run particular queries.  The various *.json routes correspond to this last set of wrappers.

Dashboard.html has a div for a header, and four content divs.  div1 contains a span for the description paragraph,
several text input areas, and a button to submit the data to the database.  div2 has a highchart div, a span to contain
the description paragraph, and two buttons to change the chart's contents.  div3 contains a div with a highchart, an img,
and three buttons to change the contents of the chart. div4 contains a div to contain a highchart, a span to contain the
paragraph text, and a combobox to change the contents of the chart.