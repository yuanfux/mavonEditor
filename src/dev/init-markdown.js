var hljs = require('highlight.js')
var katex = require('markdown-it-katex');
var emoji = require('markdown-it-emoji');

export const initMarkdown = (mavonEditor) => {
    mavonEditor.markdown.set({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code class="' + lang + '">' +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                } catch (__) {
                }
            }

            return '<pre class="hljs"><code>' + mavonEditor.markdown.utils.escapeHtml(str) + '</code></pre>';
        }
    });
    mavonEditor.markdown.use(katex).use(emoji);
}

