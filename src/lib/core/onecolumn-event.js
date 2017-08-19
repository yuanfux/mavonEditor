/**
 * Created by zhy on 2017/4/24.
 */
/**
 * keydown enter
 */
export const onecolumnKeyDownEnter = ($event , $vm , tomarkdown) => {
    let element = $event.srcElement ? $event.srcElement : $event.target
    let sel = window.getSelection();
    let range = sel.getRangeAt(0);
    // code中回车处理
    if (range.startContainer.tagName === 'CODE' || range.startContainer.tagName === 'PRE') {
        $event.preventDefault()
        onecolumnInsert(range.startContainer , '\n')
    } else if (range.startContainer.parentElement.tagName === 'CODE' || range.startContainer.parentElement.tagName === 'PRE') {
        $event.preventDefault()
        onecolumnInsert(range.startContainer.parentElement , '\n')
    } else if (!blockQuoteDoubleEnter(range.startContainer , $event , range.startContainer)) {
        $vm.s_table_enter = false
        judgeRender(range.startContainer , $event , range.startContainer , range.startContainer , $vm)
    }
    $vm.d_value = tomarkdown(element.innerHTML)
}
/**
 * insert
 */
export const onecolumnInsert = (dom , html) => {
    dom.focus()
    var sel
    var range
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement('div');
            el.innerHTML = html;
            var frag = document.createDocumentFragment()
            var node
            var lastNode
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type !== 'Control') {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}
/**
 * 连续两次在段落中换行 跳出段落
 */
export const blockQuoteDoubleEnter = (dom , $event , self) => {
    if (dom.tagName) {
        if (dom.getAttribute('class') === 'content-div content-div-edit') {
            return false
        } else if (dom.tagName === 'BLOCKQUOTE') {
            if (!self.innerText || self.innerText === '\n' || self.innerText === '') {
                $event.preventDefault()
                let sel = window.getSelection();
                let range = sel.getRangeAt(0);
                let next = dom.nextSibling
                self.outerHTML = ''
                dom.outerHTML += '<div><br/></div>'
                range = range.cloneRange()
                range.setStartAfter(next.previousSibling.lastChild);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            return true
        }
        return blockQuoteDoubleEnter(dom.parentElement, $event , dom)
    } else {
        return blockQuoteDoubleEnter(dom.parentElement, $event , dom)
    }
}
/**
 * 在表格中回车特殊处理(暂时只做表格回车 , 后续可能拓展)
 */
export const judgeRender = (dom , $event , self , pre , $vm) => {
    if (dom.tagName) {
        if (dom.tagName === 'TABLE') {
            $vm.s_table_enter = true
            self = dom
        }
        if (dom.getAttribute('class') === 'content-div content-div-edit') {
            // 在表格中回车 在表格后换行
            if ($vm.s_table_enter) {
                let sel = window.getSelection();
                let range = sel.getRangeAt(0);
                range = range.cloneRange()
                $event.preventDefault()
                let next = self.nextSibling
                self.outerHTML += '<div><br/></div>'
                range.setStartAfter(next.previousSibling.lastChild);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
            return ;
        }
        judgeRender(dom.parentElement , $event , self , dom , $vm)
    } else {
        judgeRender(dom.parentElement , $event , self , dom , $vm)
    }
}
