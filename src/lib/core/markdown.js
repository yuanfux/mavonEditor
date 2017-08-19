/**
 * @Author: HuaChao Chen <CHC>
 * @Date:   2017-05-03T00:31:20+08:00
 * @Email:  chenhuachaoxyz@gmail.com
 * @Filename: markdown.js
 * @Last modified by:   CHC
 * @Last modified time: 2017-06-20T12:30:58+08:00
 * @License: MIT
 * @Copyright: 2017
 */

/**
 * Created by zhy on 2017/3/30.
 */
// default mode
var markdown_config = {
    html: true,        // Enable HTML tags in source
    xhtmlOut: true,        // Use '/' to close single tags (<br />).
    breaks: true,        // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-markdown',  // CSS language prefix for fenced blocks. Can be
    linkify: false,        // 自动识别url
    typographer: true,
    quotes: '“”‘’',
}

var markdown = require('markdown-it')(markdown_config);
// 下标
var sub = require('markdown-it-sub')
// 上标
var sup = require('markdown-it-sup')
// <dl/>
var deflist = require('markdown-it-deflist')
// <abbr/>
var abbr = require('markdown-it-abbr')
// footnote
var footnote = require('markdown-it-footnote')
// insert 带有下划线 样式 ++ ++
var insert = require('markdown-it-ins')
// mark
var mark = require('markdown-it-mark')
//
var container = require('markdown-it-container')
var miip = require('markdown-it-images-preview');
markdown.use(sup)
    .use(sub)
    .use(container)
    .use(container, 'hljs-left')/*align left */
    .use(container, 'hljs-center')/*align center */
    .use(container, 'hljs-right')/*align right */
    .use(deflist)
    .use(abbr)
    .use(footnote)
    .use(insert)
    .use(mark)
    .use(miip)
module.exports = markdown
