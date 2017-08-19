var hljs = require('highlight.js')
var katex = require('markdown-it-katex');
var emoji = require('markdown-it-emoji');
import { mavonMarkdownIt } from '../index';
mavonMarkdownIt.set({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code class="' + lang + '">' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {
            }
        }

        return '<pre class="hljs"><code>' + mavonMarkdownIt.utils.escapeHtml(str) + '</code></pre>';
    }
});
mavonMarkdownIt.use(katex).use(emoji);
export default mavonMarkdownIt