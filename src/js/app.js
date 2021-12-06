/* eslint-disable no-console */
import NewsWidget from './NewsWidget';

const url = 'https://ahj-12-3-workers-buggy-service.herokuapp.com/news';
const widget = new NewsWidget(document.getElementById('root'), url);

widget.init();
