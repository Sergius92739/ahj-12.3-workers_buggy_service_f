/* eslint-disable no-console */
import NewsWidget from './NewsWidget';

const url = 'https://ahj-12-3.sergem.xyz/news';
const widget = new NewsWidget(document.getElementById('root'), url);

widget.init();
