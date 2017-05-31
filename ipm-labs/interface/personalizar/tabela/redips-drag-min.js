var REDIPS = REDIPS || {};
REDIPS.drag = function() {
  var remove;
  var init;
  var step;
  var f;
  var dragStart;
  var listen;
  var initialize;
  var handler;
  var process;
  var animate;
  var append;
  var $;
  var trigger;
  var draw;
  var callback;
  var each;
  var create;
  var func;
  var hasClass;
  var show;
  var offset;
  var update;
  var scroll;
  var fn;
  var jQuery;
  var done;
  var filter;
  var getStyle;
  var merge;
  var bind;
  var cb;
  var load;
  var ajax;
  var action;
  var parse;
  var apply;
  var success;
  var onSuccess;
  var walk;
  var render;
  var indexOf;
  var add;
  var run;
  var start;
  var click;
  var setElementValue;
  var require;
  var visit;
  /** @type {null} */
  var p = null;
  /** @type {RegExp} */
  var rchecked = /\bredips-drag\b/i;
  /** @type {number} */
  var width = 0;
  /** @type {number} */
  var h = 0;
  /** @type {null} */
  var scrollWidth = null;
  /** @type {null} */
  var sh = null;
  /** @type {Array} */
  var codeSegments = [];
  /** @type {null} */
  var element = null;
  /** @type {number} */
  var minX = 0;
  /** @type {number} */
  var _third = 0;
  /** @type {number} */
  var maxX = 0;
  /** @type {number} */
  var maxY = 0;
  /** @type {number} */
  var stack = 0;
  /** @type {number} */
  var memory = 0;
  var v;
  /** @type {Array} */
  var items = [];
  var elem;
  var enc3;
  var enc4;
  /** @type {Array} */
  var cache = [];
  /** @type {Array} */
  var rect = [];
  /** @type {null} */
  var node = null;
  /** @type {null} */
  var box = null;
  /** @type {number} */
  var prevX = 0;
  /** @type {number} */
  var dy = 0;
  /** @type {number} */
  var position = 0;
  /** @type {number} */
  var t = 0;
  /** @type {boolean} */
  var offsetHeight = false;
  /** @type {boolean} */
  var orig = false;
  /** @type {boolean} */
  var ea = false;
  /** @type {Array} */
  var prevSources = [];
  var headPos;
  var xhr;
  /** @type {null} */
  var k = null;
  /** @type {null} */
  var name = null;
  /** @type {null} */
  var key = null;
  /** @type {null} */
  var j = null;
  /** @type {null} */
  var r = null;
  /** @type {null} */
  var row = null;
  /** @type {null} */
  var i = null;
  /** @type {null} */
  var idx = null;
  /** @type {null} */
  var index = null;
  /** @type {boolean} */
  var el = false;
  /** @type {boolean} */
  var options = false;
  /** @type {string} */
  var mode = "cell";
  var data = {
    div : {},
    divClass : {},
    cname : "redips-only",
    other : "deny"
  };
  var result = {
    action : "deny",
    cname : "redips-mark",
    exception : {},
    exceptionClass : {}
  };
  var self = {};
  var clone = {
    keyDiv : false,
    keyRow : false,
    sendBack : false,
    drop : false
  };
  /**
   * @return {?}
   */
  step = function() {
    return false;
  };
  /**
   * @param {number} x
   * @return {undefined}
   */
  remove = function(x) {
    var i;
    var target;
    var groups;
    var tmp;
    var rowspan;
    /** @type {number} */
    items.length = 0;
    tmp = void 0 === x ? node.getElementsByTagName("table") : document.querySelectorAll(x);
    /** @type {number} */
    i = x = 0;
    for (;x < tmp.length;x++) {
      if (!("redips_clone" === tmp[x].parentNode.id || -1 < tmp[x].className.indexOf("redips-nolayout"))) {
        target = tmp[x].parentNode;
        /** @type {number} */
        groups = 0;
        do {
          if ("TD" === target.nodeName) {
            groups++;
          }
          target = target.parentNode;
        } while (target && target !== node);
        items[i] = tmp[x];
        if (!items[i].redips) {
          items[i].redips = {};
        }
        items[i].redips.container = node;
        /** @type {number} */
        items[i].redips.nestedLevel = groups;
        /** @type {number} */
        items[i].redips.idx = i;
        /** @type {number} */
        prevSources[i] = 0;
        groups = items[i].getElementsByTagName("td");
        /** @type {number} */
        target = 0;
        /** @type {boolean} */
        rowspan = false;
        for (;target < groups.length;target++) {
          if (1 < groups[target].rowSpan) {
            /** @type {boolean} */
            rowspan = true;
            break;
          }
        }
        /** @type {boolean} */
        items[i].redips.rowspan = rowspan;
        i++;
      }
    }
    /** @type {number} */
    x = 0;
    /** @type {number} */
    tmp = elem = 1;
    for (;x < items.length;x++) {
      if (0 === items[x].redips.nestedLevel) {
        /** @type {number} */
        items[x].redips.nestedGroup = tmp;
        /** @type {number} */
        items[x].redips.sort = 100 * elem;
        target = items[x].getElementsByTagName("table");
        /** @type {number} */
        i = 0;
        for (;i < target.length;i++) {
          if (!(-1 < target[i].className.indexOf("redips-nolayout"))) {
            /** @type {number} */
            target[i].redips.nestedGroup = tmp;
            target[i].redips.sort = 100 * elem + target[i].redips.nestedLevel;
          }
        }
        tmp++;
        elem++;
      }
    }
  };
  /**
   * @param {Object} evt
   * @return {?}
   */
  f = function(evt) {
    var event = evt || window.event;
    var c;
    var dx;
    if (true === this.redips.animated) {
      return true;
    }
    /** @type {boolean} */
    event.cancelBubble = true;
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    orig = event.shiftKey;
    evt = event.which ? event.which : event.button;
    if (filter(event) || !event.touches && 1 !== evt) {
      return true;
    }
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else {
      if (document.selection && "Text" === document.selection.type) {
        try {
          document.selection.empty();
        } catch (e) {
        }
      }
    }
    if (event.touches) {
      evt = prevX = event.touches[0].clientX;
      dx = dy = event.touches[0].clientY;
    } else {
      evt = prevX = event.clientX;
      dx = dy = event.clientY;
    }
    /** @type {Object} */
    position = evt;
    t = dx;
    /** @type {boolean} */
    offsetHeight = false;
    REDIPS.drag.objOld = options = el || this;
    REDIPS.drag.obj = el = this;
    /** @type {boolean} */
    ea = -1 < el.className.indexOf("redips-clone");
    if (REDIPS.drag.tableSort) {
      listen(el);
    }
    if (node !== el.redips.container) {
      node = el.redips.container;
      remove();
    }
    show();
    if (!ea) {
      if ("cell" === mode) {
        /** @type {number} */
        el.style.zIndex = 999;
      }
    }
    REDIPS.drag.td.source = self.source = merge("TD", el) || merge("TH", el);
    REDIPS.drag.td.current = self.current = self.source;
    REDIPS.drag.td.previous = self.previous = self.source;
    /** @type {number} */
    k = key = name = items.indexOf(merge("TABLE", self.source));
    j = row = r = merge("TR", self.source).rowIndex;
    i = index = idx = self.source.cellIndex;
    c = getStyle(items[key], "position");
    if ("fixed" !== c) {
      c = getStyle(items[key].parentNode, "position");
    }
    rect = hasClass(self.current, c);
    if (-1 === el.className.indexOf("row")) {
      /** @type {string} */
      REDIPS.drag.mode = mode = "cell";
      REDIPS.drag.event.clicked(self.current);
    } else {
      /** @type {string} */
      REDIPS.drag.mode = mode = "row";
      REDIPS.drag.obj = el = start(el);
      REDIPS.drag.event.rowClicked(self.current);
    }
    if (false === items[k].redips.enabled) {
      return true;
    }
    /** @type {boolean} */
    enc3 = enc4 = false;
    REDIPS.event.add(document, "mousemove", handler);
    REDIPS.event.add(document, "touchmove", handler);
    REDIPS.event.add(document, "mouseup", initialize);
    REDIPS.event.add(document, "touchend", initialize);
    if (el.setCapture) {
      el.setCapture();
    }
    if (null !== k) {
      if (null !== j && null !== i) {
        v = func(k, j, i);
      }
    }
    c = hasClass(el, c);
    /** @type {Array} */
    p = [dx - c[0], c[1] - evt, c[2] - dx, evt - c[3]];
    /**
     * @param {Object} e
     * @return {?}
     */
    node.onselectstart = function(e) {
      event = e || window.event;
      if (!filter(event)) {
        if (event.shiftKey) {
          document.selection.clear();
        }
        return false;
      }
    };
    return false;
  };
  /**
   * @return {undefined}
   */
  dragStart = function() {
    REDIPS.drag.event.dblClicked();
  };
  /**
   * @param {number} type
   * @return {undefined}
   */
  listen = function(type) {
    var nestedGroup;
    nestedGroup = merge("TABLE", type).redips.nestedGroup;
    /** @type {number} */
    type = 0;
    for (;type < items.length;type++) {
      if (items[type].redips.nestedGroup === nestedGroup) {
        items[type].redips.sort = 100 * elem + items[type].redips.nestedLevel;
      }
    }
    items.sort(function(oParent, item) {
      return item.redips.sort - oParent.redips.sort;
    });
    elem++;
  };
  /**
   * @param {Object} parent
   * @param {string} element
   * @return {?}
   */
  start = function(parent, element) {
    var that;
    var el;
    var tr;
    var node;
    var row;
    var i;
    if ("DIV" === parent.nodeName) {
      return node = parent, parent = merge("TR", parent), void 0 === parent.redips && (parent.redips = {}), parent.redips.div = node, parent;
    }
    /** @type {Object} */
    el = parent;
    if (void 0 === el.redips) {
      el.redips = {};
    }
    parent = merge("TABLE", parent);
    if (ea) {
      if (enc4) {
        node = el.redips.div;
        node.className = require(node.className.replace("redips-clone", ""));
      }
    }
    that = parent.cloneNode(true);
    if (ea) {
      if (enc4) {
        node.className += " redips-clone";
      }
    }
    /** @type {number} */
    tr = that.rows.length - 1;
    /** @type {boolean} */
    node = "animated" === element ? 0 === tr : true;
    /** @type {number} */
    row = tr;
    for (;0 <= row;row--) {
      if (row !== el.rowIndex) {
        if (true === node && void 0 === element) {
          tr = that.rows[row];
          /** @type {number} */
          i = 0;
          for (;i < tr.cells.length;i++) {
            if (-1 < tr.cells[i].className.indexOf("redips-rowhandler")) {
              /** @type {boolean} */
              node = false;
              break;
            }
          }
        }
        that.deleteRow(row);
      }
    }
    if (!enc4) {
      /** @type {boolean} */
      el.redips.emptyRow = node;
    }
    that.redips = {};
    that.redips.container = parent.redips.container;
    that.redips.sourceRow = el;
    setElementValue(el, that.rows[0]);
    jQuery(el, that.rows[0]);
    document.getElementById("redips_clone").appendChild(that);
    el = hasClass(el, "fixed");
    /** @type {string} */
    that.style.position = "fixed";
    that.style.top = el[0] + "px";
    that.style.left = el[3] + "px";
    /** @type {string} */
    that.style.width = el[1] - el[3] + "px";
    return that;
  };
  /**
   * @param {Object} item
   * @param {number} i
   * @param {Object} target
   * @return {undefined}
   */
  click = function(item, i, target) {
    /** @type {boolean} */
    var leaveInputAlone = false;
    var node;
    var li;
    var result;
    var parentNode;
    var link;
    var p;
    var parent;
    var init;
    /**
     * @param {Node} e
     * @return {undefined}
     */
    init = function(e) {
      var t;
      if (void 0 === e.redips || !e.redips.emptyRow) {
        t = merge("TABLE", e);
        t.deleteRow(e.rowIndex);
      } else {
        run(e, "empty", REDIPS.drag.style.rowEmptyColor);
      }
    };
    if (void 0 === target) {
      target = el;
    } else {
      /** @type {boolean} */
      leaveInputAlone = true;
    }
    node = target.redips.sourceRow;
    li = node.rowIndex;
    result = merge("TABLE", node);
    parentNode = node.parentNode;
    item = items[item];
    if (i > item.rows.length - 1) {
      /** @type {number} */
      i = item.rows.length - 1;
    }
    link = item.rows[i];
    /** @type {number} */
    p = i;
    parent = link.parentNode;
    i = target.getElementsByTagName("tr")[0];

    target.parentNode.removeChild(target);
    if (false !== REDIPS.drag.event.rowDroppedBefore(result, li)) {
      if (!leaveInputAlone && -1 < self.target.className.indexOf(REDIPS.drag.trash.className)) {
        if (enc4) {
          REDIPS.drag.event.rowDeleted();
        } else {
          if (REDIPS.drag.trash.questionRow) {
            if (confirm(REDIPS.drag.trash.questionRow)) {
              init(node);
              REDIPS.drag.event.rowDeleted();
            } else {
              delete options.redips.emptyRow;
              REDIPS.drag.event.rowUndeleted();
            }
          } else {
            init(node);
            REDIPS.drag.event.rowDeleted();
          }
        }
      } else {
        if (p < item.rows.length) {
          if (k === key) {
            if (li > p) {
              parent.insertBefore(i, link);
            } else {
              parent.insertBefore(i, link.nextSibling);
            }
          } else {
            if ("after" === REDIPS.drag.rowDropMode) {
              parent.insertBefore(i, link.nextSibling);
            } else {
              parent.insertBefore(i, link);
            }
          }
        } else {
          parent.appendChild(i);
          link = item.rows[0];
        }
        if (link && (link.redips && link.redips.emptyRow)) {
          item.deleteRow(link.rowIndex);
        } else {
          if ("overwrite" === REDIPS.drag.rowDropMode) {
            init(link);
          } else {
            if ("switch" === REDIPS.drag.rowDropMode) {
              if (!enc4) {
                parentNode.insertBefore(link, node);
                if (void 0 !== node.redips) {
                  delete node.redips.emptyRow;
                }
              }
            }
          }
        }
        if (leaveInputAlone || !enc4) {
          init(node);
        }
        delete i.redips.emptyRow;
        if (!leaveInputAlone) {
          REDIPS.drag.event.rowDropped(i, result, li);
        }
      }
      if (0 < i.getElementsByTagName("table").length) {
        remove();
      }
    }
  };
  /**
   * @param {Element} node
   * @param {Node} element
   * @return {undefined}
   */
  setElementValue = function(node, element) {
    var k;
    var j;
    var i;
    /** @type {Array} */
    var codeSegments = [];
    /** @type {Array} */
    var cache = [];
    codeSegments[0] = node.getElementsByTagName("input");
    codeSegments[1] = node.getElementsByTagName("textarea");
    codeSegments[2] = node.getElementsByTagName("select");
    cache[0] = element.getElementsByTagName("input");
    cache[1] = element.getElementsByTagName("textarea");
    cache[2] = element.getElementsByTagName("select");
    /** @type {number} */
    k = 0;
    for (;k < codeSegments.length;k++) {
      /** @type {number} */
      j = 0;
      for (;j < codeSegments[k].length;j++) {
        switch(i = codeSegments[k][j].type, i) {
          case "text":
          ;
          case "textarea":
          ;
          case "password":
            cache[k][j].value = codeSegments[k][j].value;
            break;
          case "radio":
          ;
          case "checkbox":
            cache[k][j].checked = codeSegments[k][j].checked;
            break;
          case "select-one":
            cache[k][j].selectedIndex = codeSegments[k][j].selectedIndex;
            break;
          case "select-multiple":
            /** @type {number} */
            i = 0;
            for (;i < codeSegments[k][j].options.length;i++) {
              cache[k][j].options[i].selected = codeSegments[k][j].options[i].selected;
            }
          ;
        }
      }
    }
  };
  /**
   * @param {Object} x
   * @return {undefined}
   */
  initialize = function(x) {
    var result = x || window.event;
    var n;
    var activeRow;
    var error;
    x = result.clientX;
    error = result.clientY;
    /** @type {number} */
    stack = memory = 0;
    if (el.releaseCapture) {
      el.releaseCapture();
    }
    REDIPS.event.remove(document, "mousemove", handler);
    REDIPS.event.remove(document, "touchmove", handler);
    REDIPS.event.remove(document, "mouseup", initialize);
    REDIPS.event.remove(document, "touchend", initialize);
    /** @type {null} */
    node.onselectstart = null;
    append(el);
    /** @type {number} */
    scrollWidth = document.documentElement.scrollWidth;
    /** @type {number} */
    sh = document.documentElement.scrollHeight;
    /** @type {number} */
    stack = memory = 0;
    if (enc4 && ("cell" === mode && (null === k || (null === j || null === i)))) {
      el.parentNode.removeChild(el);
      cache[options.id] -= 1;
      REDIPS.drag.event.notCloned();
    } else {
      if (null === k || (null === j || null === i)) {
        REDIPS.drag.event.notMoved();
      } else {
        if (k < items.length) {
          result = items[k];
          REDIPS.drag.td.target = self.target = result.rows[j].cells[i];
          create(k, j, i, v);
          /** @type {number} */
          n = k;
          activeRow = j;
        } else {
          if (null === name || (null === r || null === idx)) {
            result = items[key];
            REDIPS.drag.td.target = self.target = result.rows[row].cells[index];
            create(key, row, index, v);
            n = key;
            activeRow = row;
          } else {
            result = items[name];
            REDIPS.drag.td.target = self.target = result.rows[r].cells[idx];
            create(name, r, idx, v);
            /** @type {number} */
            n = name;
            activeRow = r;
          }
        }
        if ("row" === mode) {
          if (enc3) {
            if (key === n && row === activeRow) {
              result = el.getElementsByTagName("tr")[0];
              options.style.backgroundColor = result.style.backgroundColor;
              /** @type {number} */
              x = 0;
              for (;x < result.cells.length;x++) {
                options.cells[x].style.backgroundColor = result.cells[x].style.backgroundColor;
              }
              el.parentNode.removeChild(el);
              delete options.redips.emptyRow;
              if (enc4) {
                REDIPS.drag.event.rowNotCloned();
              } else {
                REDIPS.drag.event.rowDroppedSource(self.target);
              }
            } else {
              click(n, activeRow);
            }
          } else {
            REDIPS.drag.event.rowNotMoved();
          }
        } else {
          if (!enc4 && !offsetHeight) {
            REDIPS.drag.event.notMoved();
          } else {
            if (enc4 && (key === k && (row === j && index === i))) {
              el.parentNode.removeChild(el);
              cache[options.id] -= 1;
              REDIPS.drag.event.notCloned();
            } else {
              if (enc4 && (false === REDIPS.drag.clone.drop && (x < result.redips.offset[3] || (x > result.redips.offset[1] || (error < result.redips.offset[0] || error > result.redips.offset[2]))))) {
                el.parentNode.removeChild(el);
                cache[options.id] -= 1;
                REDIPS.drag.event.notCloned();
              } else {
                if (-1 < self.target.className.indexOf(REDIPS.drag.trash.className)) {
                  el.parentNode.removeChild(el);
                  if (REDIPS.drag.trash.question) {
                    setTimeout(function() {
                      if (confirm(REDIPS.drag.trash.question)) {
                        animate();
                      } else {
                        if (!enc4) {
                          items[key].rows[row].cells[index].appendChild(el);
                          show();
                        }
                        REDIPS.drag.event.undeleted();
                      }
                    }, 20);
                  } else {
                    animate();
                  }
                } else {
                  if ("switch" === REDIPS.drag.dropMode) {
                    if (x = REDIPS.drag.event.droppedBefore(self.target), false === x) {
                      process(false);
                    } else {
                      el.parentNode.removeChild(el);
                      result = self.target.getElementsByTagName("div");
                      n = result.length;
                      /** @type {number} */
                      x = 0;
                      for (;x < n;x++) {
                        if (void 0 !== result[0]) {
                          REDIPS.drag.objOld = options = result[0];
                          self.source.appendChild(options);
                          $(options);
                        }
                      }
                      process();
                      if (n) {
                        REDIPS.drag.event.switched();
                      }
                    }
                  } else {
                    if ("overwrite" === REDIPS.drag.dropMode) {
                      x = REDIPS.drag.event.droppedBefore(self.target);
                      if (false !== x) {
                        parse(self.target);
                      }
                    } else {
                      x = REDIPS.drag.event.droppedBefore(self.target);
                    }
                    process(x);
                  }
                }
              }
            }
          }
        }
        if ("cell" === mode) {
          if (0 < el.getElementsByTagName("table").length) {
            remove();
          }
        }
        show();
        REDIPS.drag.event.finish();
      }
    }
    /** @type {null} */
    name = r = idx = null;
  };
  /**
   * @param {Object} data
   * @return {undefined}
   */
  process = function(data) {
    /** @type {null} */
    var out = null;
    var i;
    if (false !== data) {
      if (true === clone.sendBack) {
        data = self.target.getElementsByTagName("DIV");
        /** @type {number} */
        i = 0;
        for (;i < data.length;i++) {
          if (el !== data[i] && 0 === el.id.indexOf(data[i].id)) {
            out = data[i];
            break;
          }
        }
        if (out) {
          done(out, 1);
          el.parentNode.removeChild(el);
          return;
        }
      }
      if ("shift" === REDIPS.drag.dropMode) {
        if (visit(self.target) || "always" === REDIPS.drag.shift.after) {
          apply(self.source, self.target);
        }
      }
      if ("top" === REDIPS.drag.multipleDrop && self.target.hasChildNodes()) {
        self.target.insertBefore(el, self.target.firstChild);
      } else {
        self.target.appendChild(el);
      }
      $(el);
      REDIPS.drag.event.dropped(self.target);
      if (enc4) {
        REDIPS.drag.event.clonedDropped(self.target);
        done(options, -1);
      }
    } else {
      if (enc4) {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }
    }
  };
  /**
   * @param {Object} container
   * @param {boolean} state
   * @return {undefined}
   */
  $ = function(container, state) {
    if (false === state) {
      /** @type {null} */
      container.onmousedown = null;
      /** @type {null} */
      container.ontouchstart = null;
      /** @type {null} */
      container.ondblclick = null;
    } else {
      container.onmousedown = f;
      container.ontouchstart = f;
      container.ondblclick = dragStart;
    }
  };
  /**
   * @param {Object} node
   * @return {undefined}
   */
  append = function(node) {
    /** @type {string} */
    node.style.top = "";
    /** @type {string} */
    node.style.left = "";
    /** @type {string} */
    node.style.position = "";
    /** @type {string} */
    node.style.zIndex = "";
  };
  /**
   * @return {undefined}
   */
  animate = function() {
    var suiteView;
    if (enc4) {
      done(options, -1);
    }
    if ("shift" === REDIPS.drag.dropMode && ("delete" === REDIPS.drag.shift.after || "always" === REDIPS.drag.shift.after)) {
      switch(REDIPS.drag.shift.mode) {
        case "vertical2":
          /** @type {string} */
          suiteView = "lastInColumn";
          break;
        case "horizontal2":
          /** @type {string} */
          suiteView = "lastInRow";
          break;
        default:
          /** @type {string} */
          suiteView = "last";
      }
      apply(self.source, bind(suiteView, self.source)[2]);
    }
    REDIPS.drag.event.deleted(enc4);
  };
  /**
   * @param {Object} e
   * @return {undefined}
   */
  handler = function(e) {
    e = e || window.event;
    var x = REDIPS.drag.scroll.bound;
    var item;
    var max;
    var y;
    var i;
    if (e.touches) {
      max = prevX = e.touches[0].clientX;
      y = dy = e.touches[0].clientY;
    } else {
      max = prevX = e.clientX;
      y = dy = e.clientY;
    }
    /** @type {number} */
    item = Math.abs(position - max);
    /** @type {number} */
    i = Math.abs(t - y);
    if (!enc3) {
      if ("cell" === mode && (ea || true === REDIPS.drag.clone.keyDiv && orig)) {
        REDIPS.drag.objOld = options = el;
        REDIPS.drag.obj = el = fn(el, true);
        /** @type {boolean} */
        enc4 = true;
        REDIPS.drag.event.cloned();
      } else {
        if ("row" === mode) {
          if (ea || true === REDIPS.drag.clone.keyRow && orig) {
            /** @type {boolean} */
            enc4 = true;
          }
          REDIPS.drag.objOld = options = el;
          REDIPS.drag.obj = el = start(el);
          /** @type {number} */
          el.style.zIndex = 999;
        }
        if (el.setCapture) {
          el.setCapture();
        }
        /** @type {string} */
        el.style.position = "fixed";
        show();
        callback();
        if ("row" === mode) {
          if (enc4) {
            REDIPS.drag.event.rowCloned();
          } else {
            REDIPS.drag.event.rowMoved();
          }
        }
      }
      each();
      if (max > width - p[1]) {
        /** @type {string} */
        el.style.left = width - (p[1] + p[3]) + "px";
      }
      if (y > h - p[2]) {
        /** @type {string} */
        el.style.top = h - (p[0] + p[2]) + "px";
      }
    }
    /** @type {boolean} */
    enc3 = true;
    if ("cell" === mode && ((7 < item || 7 < i) && !offsetHeight)) {
      /** @type {boolean} */
      offsetHeight = true;
      each();
      REDIPS.drag.event.moved(enc4);
    }
    if (max > p[3]) {
      if (max < width - p[1]) {
        /** @type {string} */
        el.style.left = max - p[3] + "px";
      }
    }
    if (y > p[0]) {
      if (y < h - p[2]) {
        /** @type {string} */
        el.style.top = y - p[0] + "px";
      }
    }
    if (max < box[1] && (max > box[3] && (y < box[2] && (y > box[0] && (0 === stack && (0 === memory && (rect.containTable || (max < rect[3] || (max > rect[1] || (y < rect[0] || y > rect[2])))))))))) {
      callback();
      trigger();
    }
    if (REDIPS.drag.scroll.enable) {
      /** @type {number} */
      minX = x - (width / 2 > max ? max - p[3] : width - max - p[1]);
      if (0 < minX) {
        if (minX > x && (minX = x), item = offset()[0], minX *= max < width / 2 ? -1 : 1, !(0 > minX && 0 >= item || 0 < minX && item >= scrollWidth - width) && 0 === stack++) {
          REDIPS.event.remove(window, "scroll", show);
          update(window);
        }
      } else {
        /** @type {number} */
        minX = 0;
      }
      /** @type {number} */
      _third = x - (h / 2 > y ? y - p[0] : h - y - p[2]);
      if (0 < _third) {
        if (_third > x && (_third = x), item = offset()[1], _third *= y < h / 2 ? -1 : 1, !(0 > _third && 0 >= item || 0 < _third && item >= sh - h) && 0 === memory++) {
          REDIPS.event.remove(window, "scroll", show);
          scroll(window);
        }
      } else {
        /** @type {number} */
        _third = 0;
      }
      /** @type {number} */
      i = 0;
      for (;i < codeSegments.length;i++) {
        if (item = codeSegments[i], item.autoscroll && (max < item.offset[1] && (max > item.offset[3] && (y < item.offset[2] && y > item.offset[0])))) {
          /** @type {number} */
          maxX = x - (item.midstX > max ? max - p[3] - item.offset[3] : item.offset[1] - max - p[1]);
          if (0 < maxX) {
            if (maxX > x) {
              maxX = x;
            }
            maxX *= max < item.midstX ? -1 : 1;
            if (0 === stack++) {
              REDIPS.event.remove(item.div, "scroll", show);
              update(item.div);
            }
          } else {
            /** @type {number} */
            maxX = 0;
          }
          /** @type {number} */
          maxY = x - (item.midstY > y ? y - p[0] - item.offset[0] : item.offset[2] - y - p[2]);
          if (0 < maxY) {
            if (maxY > x) {
              maxY = x;
            }
            maxY *= y < item.midstY ? -1 : 1;
            if (0 === memory++) {
              REDIPS.event.remove(item.div, "scroll", show);
              scroll(item.div);
            }
          } else {
            /** @type {number} */
            maxY = 0;
          }
          break;
        } else {
          /** @type {number} */
          maxX = maxY = 0;
        }
      }
    }
    /** @type {boolean} */
    e.cancelBubble = true;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  /**
   * @return {undefined}
   */
  trigger = function() {
    if (k < items.length && (k !== name || (j !== r || i !== idx))) {
      if (null !== name) {
        if (null !== r && null !== idx) {
          create(name, r, idx, v);
          REDIPS.drag.td.previous = self.previous = items[name].rows[r].cells[idx];
          REDIPS.drag.td.current = self.current = items[k].rows[j].cells[i];
          if ("switching" === REDIPS.drag.dropMode) {
            if ("cell" === mode) {
              action(self.current, self.previous);
              show();
              callback();
            }
          }
          if ("cell" === mode) {
            REDIPS.drag.event.changed(self.current);
          } else {
            if ("row" === mode) {
              if (k !== name || j !== r) {
                REDIPS.drag.event.rowChanged(self.current);
              }
            }
          }
        }
      }
      each();
    }
  };
  /**
   * @return {undefined}
   */
  draw = function() {
    if ("number" === typeof window.innerWidth) {
      /** @type {number} */
      width = window.innerWidth;
      /** @type {number} */
      h = window.innerHeight;
    } else {
      if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        /** @type {number} */
        width = document.documentElement.clientWidth;
        /** @type {number} */
        h = document.documentElement.clientHeight;
      } else {
        if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
          /** @type {number} */
          width = document.body.clientWidth;
          /** @type {number} */
          h = document.body.clientHeight;
        }
      }
    }
    /** @type {number} */
    scrollWidth = document.documentElement.scrollWidth;
    /** @type {number} */
    sh = document.documentElement.scrollHeight;
    show();
  };
  /**
   * @return {undefined}
   */
  callback = function() {
    var unlock;
    var callback;
    var node;
    var line;
    var startY;
    var l;
    var x;
    /** @type {Array} */
    node = [];
    var y;
    /**
     * @return {undefined}
     */
    unlock = function() {
      if (null !== name) {
        if (null !== r && null !== idx) {
          /** @type {number} */
          k = name;
          j = r;
          i = idx;
        }
      }
    };
    /**
     * @param {string} label
     * @param {string} values
     * @param {Object} object
     * @return {?}
     */
    callback = function(label, values, object) {
      /** @type {null} */
      var resource = null;
      var key;
      for (key in object) {
        if (-1 < label.indexOf(key) && (resource = false, -1 < values.indexOf(object[key]))) {
          /** @type {boolean} */
          resource = true;
          break;
        }
      }
      return resource;
    };
    x = prevX;
    y = dy;
    /** @type {number} */
    k = 0;
    for (;k < items.length;k++) {
      if (false !== items[k].redips.enabled && (node[0] = items[k].redips.offset[0], node[1] = items[k].redips.offset[1], node[2] = items[k].redips.offset[2], node[3] = items[k].redips.offset[3], void 0 !== items[k].sca && (node[0] = node[0] > items[k].sca.offset[0] ? node[0] : items[k].sca.offset[0], node[1] = node[1] < items[k].sca.offset[1] ? node[1] : items[k].sca.offset[1], node[2] = node[2] < items[k].sca.offset[2] ? node[2] : items[k].sca.offset[2], node[3] = node[3] > items[k].sca.offset[3] ? 
      node[3] : items[k].sca.offset[3]), node[3] < x && (x < node[1] && (node[0] < y && y < node[2])))) {
        line = items[k].redips.row_offset;
        /** @type {number} */
        j = 0;
        for (;j < line.length - 1;j++) {
          if (void 0 !== line[j]) {
            rect[0] = line[j][0];
            if (void 0 !== line[j + 1]) {
              rect[2] = line[j + 1][0];
            } else {
              /** @type {number} */
              l = j + 2;
              for (;l < line.length;l++) {
                if (void 0 !== line[l]) {
                  rect[2] = line[l][0];
                  break;
                }
              }
            }
            if (y <= rect[2]) {
              break;
            }
          }
        }
        /** @type {number} */
        l = j;
        if (j === line.length - 1) {
          rect[0] = line[j][0];
          rect[2] = items[k].redips.offset[2];
        }
        do {
          /** @type {number} */
          i = node = items[k].rows[j].cells.length - 1;
          for (;0 <= i;i--) {
            if (node = items[k].rows[j].cells[i], rect[3] = line[j][3] + node.offsetLeft, rect[1] = rect[3] + node.offsetWidth, startY = rect[0] + (node.offsetTop - items[k].rows[j].offsetTop), rect[3] <= x && (x <= rect[1] && (startY <= y && y <= startY + node.offsetHeight))) {
              rect[0] = startY;
              rect[2] = startY + node.offsetHeight;
              break;
            }
          }
        } while (items[k].redips.rowspan && (-1 === i && 0 < j--));
        if (0 > j || 0 > i) {
          unlock();
        } else {
          if (j !== l) {
            rect[0] = line[j][0];
            rect[2] = rect[0] + items[k].rows[j].cells[i].offsetHeight;
            if (y < rect[0] || y > rect[2]) {
              unlock();
            }
          }
        }
        node = items[k].rows[j].cells[i];
        /** @type {boolean} */
        rect.containTable = 0 < node.childNodes.length && 0 < node.getElementsByTagName("table").length;
        if (-1 === node.className.indexOf(REDIPS.drag.trash.className)) {
          if (x = callback(el.className, node.className, data.divClass), -1 < node.className.indexOf(REDIPS.drag.only.cname)) {
            if (-1 === node.className.indexOf(data.div[el.id]) && true !== x) {
              unlock();
              break;
            }
          } else {
            if ((void 0 !== data.div[el.id] || null !== x) && "deny" === data.other) {
              unlock();
              break;
            } else {
              if (x = -1 < node.className.indexOf(REDIPS.drag.mark.cname), true === x && "deny" === REDIPS.drag.mark.action || false === x && "allow" === REDIPS.drag.mark.action) {
                if (x = callback(el.className, node.className, result.exceptionClass), -1 === node.className.indexOf(result.exception[el.id]) && true !== x) {
                  unlock();
                  break;
                }
              }
            }
          }
        }
        /** @type {boolean} */
        callback = -1 < node.className.indexOf("redips-single");
        if ("cell" === mode) {
          if (("single" === REDIPS.drag.dropMode || callback) && 0 < node.childNodes.length) {
            if (1 === node.childNodes.length && 3 === node.firstChild.nodeType) {
              break;
            }
            /** @type {boolean} */
            callback = true;
            /** @type {number} */
            l = node.childNodes.length - 1;
            for (;0 <= l;l--) {
              if (node.childNodes[l].className && -1 < node.childNodes[l].className.indexOf("redips-drag")) {
                /** @type {boolean} */
                callback = false;
                break;
              }
            }
            if (!callback && (null !== name && (null !== r && null !== idx) && (key !== k || (row !== j || index !== i)))) {
              unlock();
              break;
            }
          }
          if (-1 < node.className.indexOf("redips-rowhandler")) {
            unlock();
            break;
          }
          if (node.parentNode.redips && node.parentNode.redips.emptyRow) {
            unlock();
            break;
          }
        }
        break;
      }
    }
  };
  /**
   * @return {undefined}
   */
  each = function() {
    if (k < items.length) {
      if (null !== k && (null !== j && null !== i)) {
        v = func(k, j, i);
        create(k, j, i);
        /** @type {number} */
        name = k;
        r = j;
        idx = i;
      }
    }
  };
  /**
   * @param {Object} item
   * @param {(number|string)} i
   * @param {Object} style
   * @param {number} o
   * @return {undefined}
   */
  create = function(item, i, style, o) {
    if ("cell" === mode && offsetHeight) {
      style = items[item].rows[i].cells[style].style;
      style.backgroundColor = void 0 === o ? REDIPS.drag.hover.colorTd : o.color[0].toString();
      if (void 0 !== REDIPS.drag.hover.borderTd) {
        if (void 0 === o) {
          style.border = REDIPS.drag.hover.borderTd;
        } else {
          style.borderTopWidth = o.top[0][0];
          style.borderTopStyle = o.top[0][1];
          style.borderTopColor = o.top[0][2];
          style.borderRightWidth = o.right[0][0];
          style.borderRightStyle = o.right[0][1];
          style.borderRightColor = o.right[0][2];
          style.borderBottomWidth = o.bottom[0][0];
          style.borderBottomStyle = o.bottom[0][1];
          style.borderBottomColor = o.bottom[0][2];
          style.borderLeftWidth = o.left[0][0];
          style.borderLeftStyle = o.left[0][1];
          style.borderLeftColor = o.left[0][2];
        }
      }
    } else {
      if ("row" === mode) {
        item = items[item].rows[i];
        /** @type {number} */
        i = 0;
        for (;i < item.cells.length;i++) {
          style = item.cells[i].style;
          style.backgroundColor = void 0 === o ? REDIPS.drag.hover.colorTr : o.color[i].toString();
          if (void 0 !== REDIPS.drag.hover.borderTr) {
            if (void 0 === o) {
              if (k === key) {
                if (j < row) {
                  style.borderTop = REDIPS.drag.hover.borderTr;
                } else {
                  style.borderBottom = REDIPS.drag.hover.borderTr;
                }
              } else {
                if ("before" === REDIPS.drag.rowDropMode) {
                  style.borderTop = REDIPS.drag.hover.borderTr;
                } else {
                  style.borderBottom = REDIPS.drag.hover.borderTr;
                }
              }
            } else {
              style.borderTopWidth = o.top[i][0];
              style.borderTopStyle = o.top[i][1];
              style.borderTopColor = o.top[i][2];
              style.borderBottomWidth = o.bottom[i][0];
              style.borderBottomStyle = o.bottom[i][1];
              style.borderBottomColor = o.bottom[i][2];
            }
          }
        }
      }
    }
  };
  /**
   * @param {Object} k
   * @param {number} i
   * @param {Element} n
   * @return {?}
   */
  func = function(k, i, n) {
    var config = {
      color : [],
      top : [],
      right : [],
      bottom : [],
      left : []
    };
    /**
     * @param {Element} v
     * @param {string} side
     * @return {?}
     */
    var callback = function(v, side) {
      /** @type {string} */
      var position = "border" + side + "Style";
      /** @type {string} */
      var backgroundImage = "border" + side + "Color";
      return[getStyle(v, "border" + side + "Width"), getStyle(v, position), getStyle(v, backgroundImage)];
    };
    if ("cell" === mode) {
      n = items[k].rows[i].cells[n];
      config.color[0] = n.style.backgroundColor;
      if (void 0 !== REDIPS.drag.hover.borderTd) {
        config.top[0] = callback(n, "Top");
        config.right[0] = callback(n, "Right");
        config.bottom[0] = callback(n, "Bottom");
        config.left[0] = callback(n, "Left");
      }
    } else {
      k = items[k].rows[i];
      /** @type {number} */
      i = 0;
      for (;i < k.cells.length;i++) {
        n = k.cells[i];
        config.color[i] = n.style.backgroundColor;
        if (void 0 !== REDIPS.drag.hover.borderTr) {
          config.top[i] = callback(n, "Top");
          config.bottom[i] = callback(n, "Bottom");
        }
      }
    }
    return config;
  };
  /**
   * @param {Object} el
   * @param {string} n
   * @param {boolean} selector
   * @return {?}
   */
  hasClass = function(el, n, selector) {
    /** @type {number} */
    var left = 0;
    /** @type {number} */
    var offsetTop = 0;
    /** @type {Object} */
    var d = el;
    if ("fixed" !== n) {
      /** @type {number} */
      left = 0 - headPos[0];
      /** @type {number} */
      offsetTop = 0 - headPos[1];
    }
    if (void 0 === selector || true === selector) {
      do {
        left += el.offsetLeft - el.scrollLeft;
        offsetTop += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      } while (el && "BODY" !== el.nodeName);
    } else {
      do {
        left += el.offsetLeft;
        offsetTop += el.offsetTop;
        el = el.offsetParent;
      } while (el && "BODY" !== el.nodeName);
    }
    return[offsetTop, left + d.offsetWidth, offsetTop + d.offsetHeight, left];
  };
  /**
   * @return {undefined}
   */
  show = function() {
    var i;
    var position;
    var insertions;
    var c;
    headPos = offset();
    /** @type {number} */
    i = 0;
    for (;i < items.length;i++) {
      /** @type {Array} */
      insertions = [];
      c = getStyle(items[i], "position");
      if ("fixed" !== c) {
        c = getStyle(items[i].parentNode, "position");
      }
      /** @type {number} */
      position = items[i].rows.length - 1;
      for (;0 <= position;position--) {
        if ("none" !== items[i].rows[position].style.display) {
          insertions[position] = hasClass(items[i].rows[position], c);
        }
      }
      items[i].redips.offset = hasClass(items[i], c);
      /** @type {Array} */
      items[i].redips.row_offset = insertions;
    }
    box = hasClass(node);
    /** @type {number} */
    i = 0;
    for (;i < codeSegments.length;i++) {
      c = getStyle(codeSegments[i].div, "position");
      position = hasClass(codeSegments[i].div, c, false);
      codeSegments[i].offset = position;
      /** @type {number} */
      codeSegments[i].midstX = (position[1] + position[3]) / 2;
      /** @type {number} */
      codeSegments[i].midstY = (position[0] + position[2]) / 2;
    }
  };
  /**
   * @return {?}
   */
  offset = function() {
    var scroll_width;
    var s;
    if ("number" === typeof window.pageYOffset) {
      /** @type {number} */
      scroll_width = window.pageXOffset;
      /** @type {number} */
      s = window.pageYOffset;
    } else {
      if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        /** @type {number} */
        scroll_width = document.body.scrollLeft;
        /** @type {number} */
        s = document.body.scrollTop;
      } else {
        if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
          /** @type {number} */
          scroll_width = document.documentElement.scrollLeft;
          /** @type {number} */
          s = document.documentElement.scrollTop;
        } else {
          /** @type {number} */
          scroll_width = s = 0;
        }
      }
    }
    return[scroll_width, s];
  };
  /**
   * @param {number} t
   * @return {undefined}
   */
  update = function(t) {
    var y;
    var x;
    y = prevX;
    x = dy;
    if (0 < stack) {
      show();
      callback();
      if (y < box[1]) {
        if (y > box[3] && (x < box[2] && x > box[0])) {
          trigger();
        }
      }
    }
    if ("object" === typeof t) {
      /** @type {number} */
      element = t;
    }
    if (element === window) {
      t = offset()[0];
      /** @type {number} */
      y = scrollWidth - width;
      x = minX;
    } else {
      t = element.scrollLeft;
      /** @type {number} */
      y = element.scrollWidth - element.clientWidth;
      x = maxX;
    }
    if (0 < stack && (0 > x && 0 < t || 0 < x && t < y)) {
      if (element === window) {
        window.scrollBy(x, 0);
        offset();
        /** @type {number} */
        t = parseInt(el.style.left, 10);
        isNaN(t);
      } else {
        element.scrollLeft += x;
      }
      setTimeout(update, REDIPS.drag.scroll.speed);
    } else {
      REDIPS.event.add(element, "scroll", show);
      /** @type {number} */
      stack = 0;
      /** @type {Array} */
      rect = [0, 0, 0, 0];
    }
  };
  /**
   * @param {number} a
   * @return {undefined}
   */
  scroll = function(a) {
    var x;
    var y;
    x = prevX;
    y = dy;
    if (0 < memory) {
      show();
      callback();
      if (x < box[1]) {
        if (x > box[3] && (y < box[2] && y > box[0])) {
          trigger();
        }
      }
    }
    if ("object" === typeof a) {
      /** @type {number} */
      element = a;
    }
    if (element === window) {
      a = offset()[1];
      /** @type {number} */
      x = sh - h;
      y = _third;
    } else {
      a = element.scrollTop;
      /** @type {number} */
      x = element.scrollHeight - element.clientHeight;
      y = maxY;
    }
    if (0 < memory && (0 > y && 0 < a || 0 < y && a < x)) {
      if (element === window) {
        window.scrollBy(0, y);
        offset();
        /** @type {number} */
        a = parseInt(el.style.top, 10);
        isNaN(a);
      } else {
        element.scrollTop += y;
      }
      setTimeout(scroll, REDIPS.drag.scroll.speed);
    } else {
      REDIPS.event.add(element, "scroll", show);
      /** @type {number} */
      memory = 0;
      /** @type {Array} */
      rect = [0, 0, 0, 0];
    }
  };
  /**
   * @param {Object} doc
   * @param {boolean} dataAndEvents
   * @return {?}
   */
  fn = function(doc, dataAndEvents) {
    var el = doc.cloneNode(true);
    var className = el.className;
    var result;
    var font;
    if (true === dataAndEvents) {
      document.getElementById("redips_clone").appendChild(el);
      /** @type {number} */
      el.style.zIndex = 999;
      /** @type {string} */
      el.style.position = "fixed";
      result = hasClass(doc);
      font = hasClass(el);
      /** @type {string} */
      el.style.top = result[0] - font[0] + "px";
      /** @type {string} */
      el.style.left = result[3] - font[3] + "px";
    }
    if (el.setCapture) {
      el.setCapture();
    }
    className = className.replace("redips-clone", "");
    className = className.replace(/climit(\d)_(\d+)/, "");
    el.className = require(className);
    if (void 0 === cache[doc.id]) {
      /** @type {number} */
      cache[doc.id] = 0;
    }
    el.id = doc.id + "c" + cache[doc.id];
    cache[doc.id] += 1;
    jQuery(doc, el);
    return el;
  };
  /**
   * @param {Node} root
   * @param {Node} context
   * @return {undefined}
   */
  jQuery = function(root, context) {
    /** @type {Array} */
    var F = [];
    var replaceWith;
    /**
     * @param {?} options
     * @param {Object} me
     * @return {undefined}
     */
    F[0] = function(options, me) {
      if (options.redips) {
        me.redips = {};
        me.redips.enabled = options.redips.enabled;
        me.redips.container = options.redips.container;
        if (options.redips.enabled) {
          $(me);
        }
      }
    };
    /**
     * @param {?} dataAndEvents
     * @param {?} deepDataAndEvents
     * @return {undefined}
     */
    F[1] = function(dataAndEvents, deepDataAndEvents) {
      if (dataAndEvents.redips) {
        deepDataAndEvents.redips = {};
        deepDataAndEvents.redips.emptyRow = dataAndEvents.redips.emptyRow;
      }
    };
    /**
     * @param {number} i
     * @return {undefined}
     */
    replaceWith = function(i) {
      var val;
      var match;
      var code;
      /** @type {Array} */
      match = ["DIV", "TR"];
      val = root.getElementsByTagName(match[i]);
      match = context.getElementsByTagName(match[i]);
      /** @type {number} */
      code = 0;
      for (;code < match.length;code++) {
        F[i](val[code], match[code]);
      }
    };
    if ("DIV" === root.nodeName) {
      F[0](root, context);
    } else {
      if ("TR" === root.nodeName) {
        F[1](root, context);
      }
    }
    replaceWith(0);
    replaceWith(1);
  };
  /**
   * @param {Element} options
   * @param {number} expectedNumberOfNonCommentArgs
   * @return {undefined}
   */
  done = function(options, expectedNumberOfNonCommentArgs) {
    var q;
    var mode;
    var value;
    value = options.className;
    q = value.match(/climit(\d)_(\d+)/);
    if (null !== q) {
      /** @type {number} */
      mode = parseInt(q[1], 10);
      /** @type {number} */
      q = parseInt(q[2], 10);
      if (0 === q) {
        if (1 === expectedNumberOfNonCommentArgs) {
          value += " redips-clone";
          if (2 === mode) {
            init(true, options);
          }
        }
      }
      q += expectedNumberOfNonCommentArgs;
      value = value.replace(/climit\d_\d+/g, "climit" + mode + "_" + q);
      if (0 >= q) {
        value = value.replace("redips-clone", "");
        if (2 === mode) {
          init(false, options);
          REDIPS.drag.event.clonedEnd2();
        } else {
          REDIPS.drag.event.clonedEnd1();
        }
      }
      options.className = require(value);
    }
  };
  /**
   * @param {string} e
   * @return {?}
   */
  filter = function(e) {
    /** @type {boolean} */
    var tagName = false;
    if (e.srcElement) {
      tagName = e.srcElement.nodeName;
      e = e.srcElement.className;
    } else {
      tagName = e.target.nodeName;
      e = e.target.className;
    }
    switch(tagName) {
      case "A":
      ;
      case "INPUT":
      ;
      case "SELECT":
      ;
      case "OPTION":
      ;
      case "TEXTAREA":
        /** @type {boolean} */
        tagName = true;
        break;
      default:
        /** @type {boolean} */
        tagName = /\bredips-nodrag\b/i.test(e);
    }
    return tagName;
  };
  /**
   * @param {boolean} recurring
   * @param {Element} target
   * @return {undefined}
   */
  init = function(recurring, target) {
    var i;
    var user;
    var c;
    /** @type {Array} */
    var items = [];
    /** @type {Array} */
    var result = [];
    var bordersStyle;
    var v;
    var moveParamsString;
    var e;
    /** @type {RegExp} */
    var nocode = /\bredips-noautoscroll\b/i;
    v = REDIPS.drag.style.opacityDisabled;
    if (true === recurring || "init" === recurring) {
      bordersStyle = REDIPS.drag.style.borderEnabled;
      /** @type {string} */
      moveParamsString = "move";
      /** @type {boolean} */
      e = true;
    } else {
      bordersStyle = REDIPS.drag.style.borderDisabled;
      /** @type {string} */
      moveParamsString = "auto";
      /** @type {boolean} */
      e = false;
    }
    if (void 0 === target) {
      items = node.getElementsByTagName("div");
    } else {
      if ("string" === typeof target) {
        /** @type {NodeList} */
        items = document.querySelectorAll(target);
      } else {
        if ("object" === typeof target && ("DIV" !== target.nodeName || -1 === target.className.indexOf("redips-drag"))) {
          items = target.getElementsByTagName("div");
        } else {
          /** @type {Element} */
          items[0] = target;
        }
      }
    }
    /** @type {number} */
    user = i = 0;
    for (;i < items.length;i++) {
      if (rchecked.test(items[i].className)) {
        if ("init" === recurring || void 0 === items[i].redips) {
          items[i].redips = {};
          items[i].redips.container = node;
        } else {
          if (true === recurring && "number" === typeof v) {
            /** @type {string} */
            items[i].style.opacity = "";
            /** @type {string} */
            items[i].style.filter = "";
          } else {
            if (false === recurring) {
              if ("number" === typeof v) {
                /** @type {number} */
                items[i].style.opacity = v / 100;
                /** @type {string} */
                items[i].style.filter = "alpha(opacity=" + v + ")";
              }
            }
          }
        }
        $(items[i], e);
        items[i].style.borderStyle = bordersStyle;
        items[i].style.cursor = moveParamsString;
        items[i].redips.enabled = e;
      } else {
        if ("init" === recurring && (c = getStyle(items[i], "overflow"), "visible" !== c)) {
          REDIPS.event.add(items[i], "scroll", show);
          c = getStyle(items[i], "position");
          result = hasClass(items[i], c, false);
          /** @type {boolean} */
          c = !nocode.test(items[i].className);
          codeSegments[user] = {
            div : items[i],
            offset : result,
            midstX : (result[1] + result[3]) / 2,
            midstY : (result[0] + result[2]) / 2,
            autoscroll : c
          };
          result = items[i].getElementsByTagName("table");
          /** @type {number} */
          c = 0;
          for (;c < result.length;c++) {
            result[c].sca = codeSegments[user];
          }
          user++;
        }
      }
    }
  };
  /**
   * @param {HTMLElement} a
   * @return {undefined}
   */
  walk = function(a) {
    if ("object" === typeof a && "DIV" === a.nodeName) {
      a.parentNode.removeChild(a);
    } else {
      if ("string" === typeof a) {
        if (a = document.getElementById(a)) {
          a.parentNode.removeChild(a);
        }
      }
    }
  };
  /**
   * @param {Element} el
   * @param {string} cssprop
   * @return {?}
   */
  getStyle = function(el, cssprop) {
    var style;
    if (el && el.currentStyle) {
      style = el.currentStyle[cssprop];
    } else {
      if (el) {
        if (window.getComputedStyle) {
          style = document.defaultView.getComputedStyle(el, null)[cssprop];
        }
      }
    }
    return style;
  };
  /**
   * @param {string} tag
   * @param {Node} parent
   * @param {number} common
   * @return {?}
   */
  merge = function(tag, parent, common) {
    parent = parent.parentNode;
    if (void 0 === common) {
      /** @type {number} */
      common = 0;
    }
    for (;parent;) {
      if (parent.nodeName === tag) {
        if (0 < common) {
          common--;
        } else {
          break;
        }
      }
      parent = parent.parentNode;
    }
    return parent;
  };
  /**
   * @param {?} obj
   * @param {Node} el
   * @return {?}
   */
  bind = function(obj, el) {
    var res = merge("TABLE", el);
    var i;
    var c;
    switch(obj) {
      case "firstInColumn":
        /** @type {number} */
        i = 0;
        c = el.cellIndex;
        break;
      case "firstInRow":
        i = el.parentNode.rowIndex;
        /** @type {number} */
        c = 0;
        break;
      case "lastInColumn":
        /** @type {number} */
        i = res.rows.length - 1;
        c = el.cellIndex;
        break;
      case "lastInRow":
        i = el.parentNode.rowIndex;
        /** @type {number} */
        c = res.rows[i].cells.length - 1;
        break;
      case "last":
        /** @type {number} */
        i = res.rows.length - 1;
        /** @type {number} */
        c = res.rows[i].cells.length - 1;
        break;
      default:
        /** @type {number} */
        i = c = 0;
    }
    return[i, c, res.rows[i].cells[c]];
  };
  /**
   * @param {Object} res
   * @param {?} msg
   * @return {undefined}
   */
  cb = function(res, msg) {
    if (200 === res.status) {
      load(msg.targetTable, res.responseText);
    } else {
      REDIPS.drag.error.loadContent({
        type : 0,
        message : "AJAX error: [" + res.status + "] " + res.statusText,
        text : null,
        rowIndex : null,
        cellIndex : null
      });
    }
  };
  /**
   * @param {HTMLElement} el
   * @param {Node} response
   * @return {undefined}
   */
  load = function(el, response) {
    var result;
    var node;
    var soundId;
    var idx;
    var i;
    var path;
    var msg;
    var c;
    if ("string" === typeof el) {
      /** @type {(HTMLElement|null)} */
      el = document.getElementById(el);
    }
    if (void 0 === el || (null === el || "TABLE" !== el.nodeName)) {
      REDIPS.drag.error.loadContent({
        type : 0,
        message : "Target table does not exist",
        text : null,
        rowIndex : null,
        cellIndex : null
      });
    } else {
      if (Array.isArray(response)) {
        /** @type {Node} */
        result = response;
      } else {
        try {
          /** @type {*} */
          result = JSON.parse(response);
        } catch (e2) {
          REDIPS.drag.error.loadContent({
            type : 0,
            message : e2.message,
            text : null,
            rowIndex : null,
            cellIndex : null
          });
          return;
        }
      }
      /** @type {number} */
      c = 0;
      for (;c < result.length;c++) {
        if (soundId = result[c][0], idx = result[c][1], i = result[c][2], path = result[c][3], msg = result[c][4], node = document.createElement("div"), node.id = soundId, node.className = require("redips-drag " + path), node.textContent = msg, void 0 === el.rows[idx]) {
          if (node = REDIPS.drag.error.loadContent({
            type : 1,
            message : "Target TR [" + idx + "] does not exist",
            text : msg,
            rowIndex : idx,
            cellIndex : i
          }), false === node) {
            break;
          }
        } else {
          if (void 0 === el.rows[idx].cells[i]) {
            if (node = REDIPS.drag.error.loadContent({
              type : 2,
              message : "Target TD [" + idx + "," + i + "] does not exist",
              text : msg,
              rowIndex : idx,
              cellIndex : i
            }), false === node) {
              break;
            }
          } else {
            el.rows[idx].cells[i].appendChild(node);
            init(true, node);
          }
        }
      }
    }
  };
  /**
   * @param {(Node|string)} url
   * @param {Function} error
   * @param {Object} options
   * @return {undefined}
   */
  ajax = function(url, error, options) {
    /** @type {string} */
    var method = "GET";
    /** @type {string} */
    var data = "";
    var res;
    if (void 0 === xhr) {
      /** @type {XMLHttpRequest} */
      xhr = new XMLHttpRequest;
    }
    if ("object" === typeof options) {
      if ("string" === typeof options.method) {
        if ("POST" === options.method) {
          /** @type {string} */
          method = "POST";
        }
      }
      if ("string" === typeof options.data) {
        /** @type {string} */
        data = options.data;
      }
    }
    xhr.open(method, url, true);
    /**
     * @return {undefined}
     */
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status !== 200) {
          res = REDIPS.drag.error.ajax(xhr, options);
          if (res === false) {
            return;
          }
        }
        if (typeof error === "function") {
          error.call(this, xhr, options);
        }
      }
    };
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if ("GET" === method) {
      xhr.send(null);
    } else {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }
  };
  /**
   * @param {Node} el
   * @param {Node} body
   * @param {number} i
   * @return {undefined}
   */
  action = function(el, body, i) {
    var callback;
    var container;
    var valsLength;
    /**
     * @param {Object} e
     * @param {Node} target
     * @return {undefined}
     */
    callback = function(e, target) {
      REDIPS.drag.event.relocateBefore(e, target);
      var targets = REDIPS.drag.getPosition(target);
      REDIPS.drag.moveObject({
        obj : e,
        target : targets,
        /**
         * @param {Node} event
         * @return {undefined}
         */
        callback : function(event) {
          var e = REDIPS.drag.findParent("TABLE", event);
          var i = e.redips.idx;
          REDIPS.drag.event.relocateAfter(event, target);
          prevSources[i]--;
          if (0 === prevSources[i]) {
            REDIPS.drag.event.relocateEnd();
            REDIPS.drag.enableTable(true, e);
          }
        }
      });
    };
    if (el !== body && !("object" !== typeof el || "object" !== typeof body)) {
      if (valsLength = el.childNodes.length, "animation" === i) {
        if (0 < valsLength) {
          i = merge("TABLE", body);
          container = i.redips.idx;
          REDIPS.drag.enableTable(false, i);
          /** @type {number} */
          i = 0;
          for (;i < valsLength;i++) {
            if (1 === el.childNodes[i].nodeType) {
              if ("DIV" === el.childNodes[i].nodeName) {
                prevSources[container]++;
                callback(el.childNodes[i], body);
              }
            }
          }
        }
      } else {
        /** @type {number} */
        callback = i = 0;
        for (;i < valsLength;i++) {
          if (1 === el.childNodes[callback].nodeType && "DIV" === el.childNodes[callback].nodeName) {
            container = el.childNodes[callback];
            REDIPS.drag.event.relocateBefore(container, body);
            body.appendChild(container);
            if (container.redips) {
              if (false !== container.redips.enabled) {
                $(container);
              }
            }
            REDIPS.drag.event.relocateAfter(container);
          } else {
            callback++;
          }
        }
      }
    }
  };
  /**
   * @param {Node} html
   * @param {string} execResult
   * @return {?}
   */
  parse = function(html, execResult) {
    var _len;
    /** @type {Array} */
    var resp = [];
    var _i;
    if ("TD" === html.nodeName) {
      _len = html.childNodes.length;
      if ("test" === execResult) {
        return _len = self.source === html ? void 0 : 0 === html.childNodes.length || 1 === html.childNodes.length && 3 === html.firstChild.nodeType;
      }
      /** @type {number} */
      _i = 0;
      for (;_i < _len;_i++) {
        resp.push(html.childNodes[0]);
        html.removeChild(html.childNodes[0]);
      }
      return resp;
    }
  };
  /**
   * @param {Node} el
   * @param {Node} element
   * @return {undefined}
   */
  apply = function(el, element) {
    var item;
    var value;
    var tmp;
    var currToken;
    var mode;
    var indices;
    var c;
    var data;
    var col;
    var column;
    var index;
    var date;
    /** @type {boolean} */
    var p = false;
    var callback;
    var init;
    /**
     * @param {Node} text
     * @param {Node} i
     * @return {undefined}
     */
    callback = function(text, i) {
      if (REDIPS.drag.shift.animation) {
        action(text, i, "animation");
      } else {
        action(text, i);
      }
    };
    /**
     * @param {Node} markup
     * @return {undefined}
     */
    init = function(markup) {
      if ("delete" === REDIPS.drag.shift.overflow) {
        parse(markup);
      } else {
        if ("source" === REDIPS.drag.shift.overflow) {
          callback(markup, self.source);
        } else {
          if ("object" === typeof REDIPS.drag.shift.overflow) {
            callback(markup, REDIPS.drag.shift.overflow);
          }
        }
      }
      /** @type {boolean} */
      p = false;
      REDIPS.drag.event.shiftOverflow(markup);
    };
    if (el !== element) {
      mode = REDIPS.drag.shift.mode;
      item = merge("TABLE", el);
      value = merge("TABLE", element);
      indices = success(value);
      /** @type {Array} */
      tmp = item === value ? [el.redips.rowIndex, el.redips.cellIndex] : [-1, -1];
      /** @type {Array} */
      currToken = [element.redips.rowIndex, element.redips.cellIndex];
      index = value.rows.length;
      date = onSuccess(value);
      switch(mode) {
        case "vertical2":
          /** @type {Array} */
          item = item === value && el.redips.cellIndex === element.redips.cellIndex ? tmp : [index, element.redips.cellIndex];
          break;
        case "horizontal2":
          /** @type {Array} */
          item = item === value && el.parentNode.rowIndex === element.parentNode.rowIndex ? tmp : [element.redips.rowIndex, date];
          break;
        default:
          /** @type {Array} */
          item = item === value ? tmp : [index, date];
      }
      if ("vertical1" === mode || "vertical2" === mode) {
        /** @type {number} */
        mode = 1E3 * item[1] + item[0] < 1E3 * currToken[1] + currToken[0] ? 1 : -1;
        value = index;
        /** @type {number} */
        index = 0;
        /** @type {number} */
        date = 1;
      } else {
        /** @type {number} */
        mode = 1E3 * item[0] + item[1] < 1E3 * currToken[0] + currToken[1] ? 1 : -1;
        value = date;
        /** @type {number} */
        index = 1;
        /** @type {number} */
        date = 0;
      }
      if (item[0] !== tmp[0]) {
        if (item[1] !== tmp[1]) {
          /** @type {boolean} */
          p = true;
        }
      }
      for (;item[0] !== currToken[0] || item[1] !== currToken[1];) {
        if (c = indices[item[0] + "-" + item[1]], item[index] += mode, 0 > item[index] ? (item[index] = value, item[date]--) : item[index] > value && (item[index] = 0, item[date]++), tmp = indices[item[0] + "-" + item[1]], void 0 !== tmp && (data = tmp), void 0 !== c && (col = c), void 0 !== tmp && void 0 !== col || void 0 !== data && void 0 !== c) {
          /** @type {number} */
          tmp = -1 === data.className.indexOf(REDIPS.drag.mark.cname) ? 0 : 1;
          /** @type {number} */
          c = -1 === col.className.indexOf(REDIPS.drag.mark.cname) ? 0 : 1;
          if (p) {
            if (0 === tmp) {
              if (1 === c) {
                init(data);
              }
            }
          }
          if (1 === tmp) {
            if (0 === c) {
              column = col;
            }
          } else {
            if (0 === tmp) {
              if (1 === c) {
                col = column;
              }
            }
            callback(data, col);
          }
        } else {
          if (p) {
            if (void 0 !== data && void 0 === col) {
              /** @type {number} */
              tmp = -1 === data.className.indexOf(REDIPS.drag.mark.cname) ? 0 : 1;
              if (0 === tmp) {
                init(data);
              }
            }
          }
        }
      }
    }
  };
  /**
   * @param {Object} s
   * @return {?}
   */
  success = function(s) {
    /** @type {Array} */
    var row = [];
    var cell;
    var response = {};
    var height;
    var b;
    var a;
    var codeSegments;
    var i;
    var j;
    var y;
    var k;
    codeSegments = s.rows;
    /** @type {number} */
    i = 0;
    for (;i < codeSegments.length;i++) {
      /** @type {number} */
      j = 0;
      for (;j < codeSegments[i].cells.length;j++) {
        cell = codeSegments[i].cells[j];
        s = cell.parentNode.rowIndex;
        height = cell.rowSpan || 1;
        b = cell.colSpan || 1;
        row[s] = row[s] || [];
        /** @type {number} */
        y = 0;
        for (;y < row[s].length + 1;y++) {
          if ("undefined" === typeof row[s][y]) {
            /** @type {number} */
            a = y;
            break;
          }
        }
        response[s + "-" + a] = cell;
        if (void 0 === cell.redips) {
          cell.redips = {};
        }
        /** @type {Object} */
        cell.redips.rowIndex = s;
        /** @type {(number|undefined)} */
        cell.redips.cellIndex = a;
        /** @type {Object} */
        y = s;
        for (;y < s + height;y++) {
          row[y] = row[y] || [];
          cell = row[y];
          /** @type {(number|undefined)} */
          k = a;
          for (;k < a + b;k++) {
            /** @type {string} */
            cell[k] = "x";
          }
        }
      }
    }
    return response;
  };
  /**
   * @param {HTMLElement} s
   * @return {?}
   */
  onSuccess = function(s) {
    if ("string" === typeof s) {
      /** @type {(HTMLElement|null)} */
      s = document.getElementById(s);
    }
    s = s.rows;
    var current;
    /** @type {number} */
    var computed = 0;
    var i;
    var j;
    /** @type {number} */
    i = 0;
    for (;i < s.length;i++) {
      /** @type {number} */
      j = current = 0;
      for (;j < s[i].cells.length;j++) {
        current += s[i].cells[j].colSpan || 1;
      }
      if (current > computed) {
        computed = current;
      }
    }
    return computed;
  };
  /**
   * @param {number} i
   * @param {Object} self
   * @return {undefined}
   */
  render = function(i, self) {
    /** @type {number} */
    var maxWait = (self.k1 - self.k2 * i) * (self.k1 - self.k2 * i);
    var iOffSh;
    i = i + REDIPS.drag.animation.step * (4 - 3 * maxWait) * self.direction;
    iOffSh = self.m * i + self.b;
    if ("horizontal" === self.type) {
      /** @type {string} */
      self.obj.style.left = i + "px";
      /** @type {string} */
      self.obj.style.top = iOffSh + "px";
    } else {
      /** @type {string} */
      self.obj.style.left = iOffSh + "px";
      /** @type {string} */
      self.obj.style.top = i + "px";
    }
    if (i < self.last && 0 < self.direction || i > self.last && 0 > self.direction) {
      setTimeout(function() {
        render(i, self);
      }, REDIPS.drag.animation.pause * maxWait);
    } else {
      append(self.obj);
      if (self.obj.redips) {
        /** @type {boolean} */
        self.obj.redips.animated = false;
      }
      if ("cell" === self.mode) {
        if (true === self.overwrite) {
          parse(self.targetCell);
        }
        self.targetCell.appendChild(self.obj);
        if (self.obj.redips) {
          if (false !== self.obj.redips.enabled) {
            $(self.obj);
          }
        }
      } else {
        click(indexOf(self.target[0]), self.target[1], self.obj);
      }
      if ("function" === typeof self.callback) {
        self.callback(self.obj);
      }
    }
  };
  /**
   * @param {HTMLElement} a
   * @return {?}
   */
  add = function(a) {
    var c;
    var f;
    var nameval;
    /** @type {Array} */
    c = [];
    /** @type {number} */
    c = f = nameval = -1;
    if (void 0 === a) {
      c = k < items.length ? items[k].redips.idx : null === name || (null === r || null === idx) ? items[key].redips.idx : items[name].redips.idx;
      f = items[key].redips.idx;
      /** @type {Array} */
      c = [c, j, i, f, row, index];
    } else {
      if (a = "string" === typeof a ? document.getElementById(a) : a) {
        if ("TD" !== a.nodeName) {
          a = merge("TD", a);
        }
        if (a) {
          if ("TD" === a.nodeName) {
            c = a.cellIndex;
            f = a.parentNode.rowIndex;
            a = merge("TABLE", a);
            nameval = a.redips.idx;
          }
        }
      }
      /** @type {Array} */
      c = [nameval, f, c];
    }
    return c;
  };
  /**
   * @param {?} o
   * @return {?}
   */
  indexOf = function(o) {
    var i;
    /** @type {number} */
    i = 0;
    for (;i < items.length && items[i].redips.idx !== o;i++) {
    }
    return i;
  };
  /**
   * @param {string} arg
   * @return {?}
   */
  require = function(arg) {
    if (void 0 !== arg) {
      arg = arg.replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
    }
    return arg;
  };
  /**
   * @param {Node} node
   * @return {?}
   */
  visit = function(node) {
    var i;
    /** @type {number} */
    i = 0;
    for (;i < node.childNodes.length;i++) {
      if (1 === node.childNodes[i].nodeType) {
        return true;
      }
    }
    return false;
  };
  /**
   * @param {Node} el
   * @param {number} o
   * @param {(number|string)} obj
   * @return {undefined}
   */
  run = function(el, o, obj) {
    var i;
    var x;
    if ("string" === typeof el) {
      /** @type {(HTMLElement|null)} */
      el = document.getElementById(el);
      el = merge("TABLE", el);
    }
    if ("TR" === el.nodeName) {
      el = el.getElementsByTagName("td");
      /** @type {number} */
      i = 0;
      for (;i < el.length;i++) {
        if (el[i].style.backgroundColor = obj ? obj : "", "empty" === o) {
          /** @type {string} */
          el[i].innerHTML = "";
        } else {
          /** @type {number} */
          x = 0;
          for (;x < el[i].childNodes.length;x++) {
            if (1 === el[i].childNodes[x].nodeType) {
              /** @type {number} */
              el[i].childNodes[x].style.opacity = o / 100;
              /** @type {string} */
              el[i].childNodes[x].style.filter = "alpha(opacity=" + o + ")";
            }
          }
        }
      }
    } else {
      /** @type {number} */
      el.style.opacity = o / 100;
      /** @type {string} */
      el.style.filter = "alpha(opacity=" + o + ")";
      el.style.backgroundColor = obj ? obj : "";
    }
  };
  return{
    obj : el,
    objOld : options,
    mode : mode,
    td : self,
    hover : {
      colorTd : "#E7AB83",
      colorTr : "#E7AB83"
    },
    scroll : {
      enable : true,
      bound : 25,
      speed : 20
    },
    only : data,
    mark : result,
    style : {
      borderEnabled : "solid",
      borderDisabled : "dotted",
      opacityDisabled : "",
      rowEmptyColor : "white"
    },
    trash : {
      className : "redips-trash",
      question : null,
      questionRow : null
    },
    saveParamName : "p",
    dropMode : "multiple",
    multipleDrop : "bottom",
    clone : clone,
    animation : {
      pause : 20,
      step : 2,
      shift : false
    },
    shift : {
      mode : "horizontal1",
      after : "default",
      overflow : "bunch"
    },
    rowDropMode : "before",
    tableSort : true,
    /**
     * @param {Object} p
     * @return {undefined}
     */
    init : function(p) {
      var points;
      if (void 0 === p || "string" !== typeof p) {
        /** @type {string} */
        p = "redips-drag";
      }
      /** @type {(HTMLElement|null)} */
      node = document.getElementById(p);
      if (null === node) {
        throw "REDIPS.drag - Drag container is not set!";
      }
      headPos = offset();
      if (!document.getElementById("redips_clone")) {
        /** @type {Element} */
        p = document.createElement("div");
        /** @type {string} */
        p.id = "redips_clone";
        /** @type {string} */
        p.style.width = p.style.height = "1px";
        node.appendChild(p);
      }
      init("init");
      remove();
      draw();
      REDIPS.event.add(window, "resize", draw);
      /** @type {NodeList} */
      points = node.getElementsByTagName("img");
      /** @type {number} */
      p = 0;
      for (;p < points.length;p++) {
        REDIPS.event.add(points[p], "mousemove", step);
        REDIPS.event.add(points[p], "touchmove", step);
      }
      REDIPS.event.add(window, "scroll", show);
    },
    /** @type {function (number): undefined} */
    initTables : remove,
    /** @type {function (boolean, Element): undefined} */
    enableDrag : init,
    /**
     * @param {HTMLElement} el
     * @return {undefined}
     */
    clearTable : function(el) {
      var k;
      if ("string" === typeof el) {
        /** @type {(HTMLElement|null)} */
        el = document.getElementById(el);
      }
      if ("object" !== typeof el || "TABLE" !== el.nodeName) {
        console.log("REDIPS.drag.clearTable: input element is not HTML table");
      } else {
        el = el.getElementsByTagName("DIV");
        /** @type {number} */
        k = el.length - 1;
        for (;0 <= k;k--) {
          if (rchecked.test(el[k].className)) {
            walk(el[k]);
          }
        }
      }
    },
    /**
     * @param {boolean} recurring
     * @param {Node} object
     * @return {undefined}
     */
    enableTable : function(recurring, object) {
      var i;
      if ("object" === typeof object && "TABLE" === object.nodeName) {
        /** @type {boolean} */
        object.redips.enabled = recurring;
      } else {
        /** @type {number} */
        i = 0;
        for (;i < items.length;i++) {
          if (-1 < items[i].className.indexOf(object)) {
            /** @type {boolean} */
            items[i].redips.enabled = recurring;
          }
        }
      }
    },
    /** @type {function (Object, boolean): ?} */
    cloneObject : fn,
    /**
     * @param {HTMLElement} options
     * @param {string} dataAndEvents
     * @return {?}
     */
    saveContent : function(options, dataAndEvents) {
      /** @type {string} */
      var matched = "";
      var propsLen;
      var kl;
      var path;
      var j;
      var gradient;
      var node;
      var idx;
      var k;
      var i;
      /** @type {Array} */
      var errors = [];
      var indent = REDIPS.drag.saveParamName;
      if ("string" === typeof options) {
        /** @type {(HTMLElement|null)} */
        options = document.getElementById(options);
      }
      if (void 0 !== options && ("object" === typeof options && "TABLE" === options.nodeName)) {
        propsLen = options.rows.length;
        /** @type {number} */
        idx = 0;
        for (;idx < propsLen;idx++) {
          kl = options.rows[idx].cells.length;
          /** @type {number} */
          k = 0;
          for (;k < kl;k++) {
            if (gradient = options.rows[idx].cells[k], 0 < gradient.childNodes.length) {
              /** @type {number} */
              i = 0;
              for (;i < gradient.childNodes.length;i++) {
                node = gradient.childNodes[i];
                if ("DIV" === node.nodeName) {
                  if (-1 < node.className.indexOf("redips-drag")) {
                    path = node.className.replace(/redips-\w+/g, "");
                    path = require(path);
                    j = node.innerText || node.textContent;
                    matched += indent + "[]=" + node.id + "_" + idx + "_" + k + "_" + path + "_" + j + "&";
                    errors.push([node.id, idx, k, path, j]);
                  }
                }
              }
            }
          }
        }
        /** @type {string} */
        matched = "json" === dataAndEvents && 0 < errors.length ? JSON.stringify(errors) : matched.substring(0, matched.length - 1);
      }
      return matched;
    },
    /**
     * @param {?} opt_attributes
     * @param {Node} url
     * @return {undefined}
     */
    loadContent : function(opt_attributes, url) {
      if (Array.isArray(url)) {
        load(opt_attributes, url);
      } else {
        if ("string" === typeof url) {
          try {
            JSON.parse(url);
            load(opt_attributes, url);
          } catch (b) {
            ajax(url, cb, {
              targetTable : opt_attributes
            });
          }
        } else {
          REDIPS.drag.error.loadContent({
            type : 0,
            message : "Invalid input parameter (URL or JSON is expected)",
            text : null,
            rowIndex : null,
            cellIndex : null
          });
        }
      }
    },
    /** @type {function ((Node|string), Function, Object): undefined} */
    ajaxCall : ajax,
    /** @type {function (Node, Node, number): undefined} */
    relocate : action,
    /** @type {function (Node, string): ?} */
    emptyCell : parse,
    /**
     * @param {Object} result
     * @return {?}
     */
    moveObject : function(result) {
      var self = {
        direction : 1
      };
      var a;
      var top;
      var b;
      var bottom;
      var i;
      var w;
      self.callback = result.callback;
      self.overwrite = result.overwrite;
      if ("string" === typeof result.id) {
        /** @type {(HTMLElement|null)} */
        self.obj = self.objOld = document.getElementById(result.id);
      } else {
        if ("object" === typeof result.obj) {
          if ("DIV" === result.obj.nodeName) {
            self.obj = self.objOld = result.obj;
          }
        }
      }
      if ("row" === result.mode) {
        /** @type {string} */
        self.mode = "row";
        w = indexOf(result.source[0]);
        i = result.source[1];
        options = self.objOld = items[w].rows[i];
        if (options.redips && true === options.redips.emptyRow) {
          return false;
        }
        self.obj = start(self.objOld, "animated");
      } else {
        if (self.obj && -1 < self.obj.className.indexOf("redips-row")) {
          /** @type {string} */
          self.mode = "row";
          self.obj = self.objOld = options = merge("TR", self.obj);
          if (options.redips && true === options.redips.emptyRow) {
            return false;
          }
          self.obj = start(self.objOld, "animated");
        } else {
          /** @type {string} */
          self.mode = "cell";
        }
      }
      if (!("object" !== typeof self.obj || null === self.obj)) {
        return self.obj.style.zIndex = 999, self.obj.redips && (node !== self.obj.redips.container && (node = self.obj.redips.container, remove())), w = hasClass(self.obj), b = w[1] - w[3], bottom = w[2] - w[0], a = w[3], top = w[0], true === result.clone && ("cell" === self.mode && (self.obj = fn(self.obj, true), REDIPS.drag.event.cloned(self.obj))), void 0 === result.target ? result.target = add() : "object" === typeof result.target && ("TD" === result.target.nodeName && (result.target = add(result.target))), 
        self.target = result.target, w = indexOf(result.target[0]), i = result.target[1], result = result.target[2], i > items[w].rows.length - 1 && (i = items[w].rows.length - 1), self.targetCell = items[w].rows[i].cells[result], "cell" === self.mode ? (w = hasClass(self.targetCell), i = w[1] - w[3], result = w[2] - w[0], b = w[3] + (i - b) / 2, bottom = w[0] + (result - bottom) / 2) : (w = hasClass(items[w].rows[i]), b = w[3], bottom = w[0]), w = b - a, result = bottom - top, self.obj.style.position = 
        "fixed", Math.abs(w) > Math.abs(result) ? (self.type = "horizontal", self.m = result / w, self.b = top - self.m * a, self.k1 = (a + b) / (a - b), self.k2 = 2 / (a - b), a > b && (self.direction = -1), w = a, self.last = b) : (self.type = "vertical", self.m = w / result, self.b = a - self.m * top, self.k1 = (top + bottom) / (top - bottom), self.k2 = 2 / (top - bottom), top > bottom && (self.direction = -1), w = top, self.last = bottom), self.obj.redips && (self.obj.redips.animated = true), 
        render(w, self), [self.obj, self.objOld];
      }
    },
    /** @type {function (Node, Node): undefined} */
    shiftCells : apply,
    /** @type {function (HTMLElement): undefined} */
    deleteObject : walk,
    /** @type {function (HTMLElement): ?} */
    getPosition : add,
    /** @type {function (Node, number, (number|string)): undefined} */
    rowOpacity : run,
    /**
     * @param {(RegExp|string)} d
     * @param {?} index
     * @param {number} walkers
     * @return {undefined}
     */
    rowEmpty : function(d, index, walkers) {
      d = document.getElementById(d).rows[index];
      if (void 0 === walkers) {
        walkers = REDIPS.drag.style.rowEmptyColor;
      }
      if (void 0 === d.redips) {
        d.redips = {};
      }
      /** @type {boolean} */
      d.redips.emptyRow = true;
      run(d, "empty", walkers);
    },
    /** @type {function (): ?} */
    getScrollPosition : offset,
    /** @type {function (Element, string): ?} */
    getStyle : getStyle,
    /** @type {function (string, Node, number): ?} */
    findParent : merge,
    /** @type {function (?, Node): ?} */
    findCell : bind,
    event : {
      /**
       * @return {undefined}
       */
      changed : function() {
      },
      /**
       * @return {undefined}
       */
      clicked : function() {
      },
      /**
       * @return {undefined}
       */
      cloned : function() {
      },
      /**
       * @return {undefined}
       */
      clonedDropped : function() {
      },
      /**
       * @return {undefined}
       */
      clonedEnd1 : function() {
      },
      /**
       * @return {undefined}
       */
      clonedEnd2 : function() {
      },
      /**
       * @return {undefined}
       */
      dblClicked : function() {
      },
      /**
       * @return {undefined}
       */
      deleted : function() {
      },
      /**
       * @return {undefined}
       */
      dropped : function() {
      },
      /**
       * @return {undefined}
       */
      droppedBefore : function() {
      },
      /**
       * @return {undefined}
       */
      finish : function() {
      },
      /**
       * @return {undefined}
       */
      moved : function() {
      },
      /**
       * @return {undefined}
       */
      notCloned : function() {
      },
      /**
       * @return {undefined}
       */
      notMoved : function() {
      },
      /**
       * @return {undefined}
       */
      shiftOverflow : function() {
      },
      /**
       * @return {undefined}
       */
      relocateBefore : function() {
      },
      /**
       * @return {undefined}
       */
      relocateAfter : function() {
      },
      /**
       * @return {undefined}
       */
      relocateEnd : function() {
      },
      /**
       * @return {undefined}
       */
      rowChanged : function() {
      },
      /**
       * @return {undefined}
       */
      rowClicked : function() {
      },
      /**
       * @return {undefined}
       */
      rowCloned : function() {
      },
      /**
       * @return {undefined}
       */
      rowDeleted : function() {
      },
      /**
       * @return {undefined}
       */
      rowDropped : function() {
      },
      /**
       * @return {undefined}
       */
      rowDroppedBefore : function() {
      },
      /**
       * @return {undefined}
       */
      rowDroppedSource : function() {
      },
      /**
       * @return {undefined}
       */
      rowMoved : function() {
      },
      /**
       * @return {undefined}
       */
      rowNotCloned : function() {
      },
      /**
       * @return {undefined}
       */
      rowNotMoved : function() {
      },
      /**
       * @return {undefined}
       */
      rowUndeleted : function() {
      },
      /**
       * @return {undefined}
       */
      switched : function() {
      },
      /**
       * @return {undefined}
       */
      undeleted : function() {
      }
    },
    error : {
      /**
       * @return {undefined}
       */
      ajax : function() {
      },
      /**
       * @return {undefined}
       */
      loadContent : function() {
      }
    }
  };
}();
if (!REDIPS.event) {
  REDIPS.event = function() {
    return{
      /**
       * @param {Object} element
       * @param {string} eventType
       * @param {?} callback
       * @return {undefined}
       */
      add : function(element, eventType, callback) {
        if (element.addEventListener) {
          element.addEventListener(eventType, callback, false);
        } else {
          if (element.attachEvent) {
            element.attachEvent("on" + eventType, callback);
          } else {
            element["on" + eventType] = callback;
          }
        }
      },
      /**
       * @param {Object} element
       * @param {string} name
       * @param {?} callback
       * @return {undefined}
       */
      remove : function(element, name, callback) {
        if (element.removeEventListener) {
          element.removeEventListener(name, callback, false);
        } else {
          if (element.detachEvent) {
            element.detachEvent("on" + name, callback);
          } else {
            /** @type {null} */
            element["on" + name] = null;
          }
        }
      }
    };
  }();
}
;