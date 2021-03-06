/**
 * Created by zx on 17-6-15.
 */
!
function(a) {
	function c() {
		return "Markdown.mk_block( " + uneval(this.toString()) + ", " + uneval(this.trailing) + ", " + uneval(this.lineNumber) + " )"
	}
	function d() {
		var a = require("util");
		return "Markdown.mk_block( " + a.inspect(this.toString()) + ", " + a.inspect(this.trailing) + ", " + a.inspect(this.lineNumber) + " )"
	}
	function h(a) {
		for (var b = 0, c = -1; - 1 !== (c = a.indexOf("\n", c + 1));) b++;
		return b
	}
	function j(a) {
		return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
	}
	function k(a) {
		if ("string" == typeof a) return j(a);
		var b = a.shift(),
			c = {},
			d = [];
		for (!a.length || "object" != typeof a[0] || a[0] instanceof Array || (c = a.shift()); a.length;) d.push(k(a.shift()));
		var e = "";
		for (var f in c) e += " " + f + '="' + j(c[f]) + '"';
		return "img" === b || "br" === b || "hr" === b ? "<" + b + e + "/>" : "<" + b + e + ">" + d.join("") + "</" + b + ">"
	}
	function l(a, b, c) {
		var d;
		c = c || {};
		var e = a.slice(0);
		"function" == typeof c.preprocessTreeNode && (e = c.preprocessTreeNode(e, b));
		var f = i(e);
		if (f) {
			e[1] = {};
			for (d in f) e[1][d] = f[d];
			f = e[1]
		}
		if ("string" == typeof e) return e;
		switch (e[0]) {
		case "header":
			e[0] = "h" + e[1].level, delete e[1].level;
			break;
		case "bulletlist":
			e[0] = "ul";
			break;
		case "numberlist":
			e[0] = "ol";
			break;
		case "listitem":
			e[0] = "li";
			break;
		case "para":
			e[0] = "p";
			break;
		case "markdown":
			e[0] = "html", f && delete f.references;
			break;
		case "code_block":
			e[0] = "pre", d = f ? 2 : 1;
			var g = ["code"];
			g.push.apply(g, e.splice(d, e.length - d)), e[d] = g;
			break;
		case "inlinecode":
			e[0] = "code";
			break;
		case "img":
			e[1].src = e[1].href, delete e[1].href;
			break;
		case "linebreak":
			e[0] = "br";
			break;
		case "link":
			e[0] = "a";
			break;
		case "link_ref":
			e[0] = "a";
			var h = b[f.ref];
			if (!h) return f.original;
			delete f.ref, f.href = h.href, h.title && (f.title = h.title), delete f.original;
			break;
		case "img_ref":
			e[0] = "img";
			var h = b[f.ref];
			if (!h) return f.original;
			delete f.ref, f.src = h.href, h.title && (f.title = h.title), delete f.original
		}
		if (d = 1, f) {
			for (var j in e[1]) {
				d = 2;
				break
			}
			1 === d && e.splice(d, 1)
		}
		for (; d < e.length; ++d) e[d] = l(e[d], b, c);
		return e
	}
	function m(a) {
		for (var b = i(a) ? 2 : 1; b < a.length;)"string" == typeof a[b] ? b + 1 < a.length && "string" == typeof a[b + 1] ? a[b] += a.splice(b + 1, 1)[0] : ++b : (m(a[b]), ++b)
	}
	function s(a, b) {
		function e(a) {
			this.len_after = a, this.name = "close_" + b
		}
		var c = a + "_state",
			d = "strong" === a ? "em_state" : "strong_state";
		return function(f) {
			if (this[c][0] === b) return this[c].shift(), [f.length, new e(f.length - b.length)];
			var g = this[d].slice(),
				h = this[c].slice();
			this[c].unshift(b);
			var i = this.processInline(f.substr(b.length)),
				j = i[i.length - 1];
			if (this[c].shift(), j instanceof e) {
				i.pop();
				var l = f.length - j.len_after;
				return [l, [a].concat(i)]
			}
			return this[d] = g, this[c] = h, [b.length, b]
		}
	}
	function u(a) {
		for (var b = a.split(""), c = [""], d = !1; b.length;) {
			var e = b.shift();
			switch (e) {
			case " ":
				d ? c[c.length - 1] += e : c.push("");
				break;
			case "'":
			case '"':
				d = !d;
				break;
			case "\\":
				e = b.shift();
			default:
				c[c.length - 1] += e
			}
		}
		return c
	}
	var b = {};
	b.mk_block = function(a, b, e) {
		1 === arguments.length && (b = "\n\n");
		var f = new String(a);
		return f.trailing = b, f.inspect = d, f.toSource = c, void 0 !== e && (f.lineNumber = e), f
	};
	var e = b.isArray = Array.isArray ||
	function(a) {
		return "[object Array]" === Object.prototype.toString.call(a)
	};
	b.forEach = Array.prototype.forEach ?
	function(a, b, c) {
		return a.forEach(b, c)
	} : function(a, b, c) {
		for (var d = 0; d < a.length; d++) b.call(c || a, a[d], d, a)
	}, b.isEmpty = function(a) {
		for (var b in a) if (hasOwnProperty.call(a, b)) return !1;
		return !0
	}, b.extract_attr = function(a) {
		return e(a) && a.length > 1 && "object" == typeof a[1] && !e(a[1]) ? a[1] : void 0
	};
	var f = function(a) {
			switch (typeof a) {
			case "undefined":
				this.dialect = f.dialects.Gruber;
				break;
			case "object":
				this.dialect = a;
				break;
			default:
				if (!(a in f.dialects)) throw new Error("Unknown Markdown dialect '" + String(a) + "'");
				this.dialect = f.dialects[a]
			}
			this.em_state = [], this.strong_state = [], this.debug_indent = ""
		};
	f.dialects = {};
	var g = f.mk_block = b.mk_block,
		e = b.isArray;
	f.parse = function(a, b) {
		var c = new f(b);
		return c.toTree(a)
	}, f.prototype.split_blocks = function(a) {
		a = a.replace(/(\r\n|\n|\r)/g, "\n");
		var d, b = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,
			c = [],
			e = 1;
		for (null !== (d = /^(\s*\n)/.exec(a)) && (e += h(d[0]), b.lastIndex = d[0].length); null !== (d = b.exec(a));)"\n#" === d[2] && (d[2] = "\n", b.lastIndex--), c.push(g(d[1], d[2], e)), e += h(d[0]);
		return c
	}, f.prototype.processBlock = function(a, b) {
		var c = this.dialect.block,
			d = c.__order__;
		if ("__call__" in c) return c.__call__.call(this, a, b);
		for (var f = 0; f < d.length; f++) {
			var g = c[d[f]].call(this, a, b);
			if (g) return (!e(g) || g.length > 0 && !e(g[0])) && this.debug(d[f], "didn't return a proper array"), g
		}
		return []
	}, f.prototype.processInline = function(a) {
		return this.dialect.inline.__call__.call(this, String(a))
	}, f.prototype.toTree = function(a, b) {
		var c = a instanceof Array ? a : this.split_blocks(a),
			d = this.tree;
		try {
			for (this.tree = b || this.tree || ["markdown"]; c.length;) {
				var e = this.processBlock(c.shift(), c);
				e.length && this.tree.push.apply(this.tree, e)
			}
			return this.tree
		} finally {
			b && (this.tree = d)
		}
	}, f.prototype.debug = function() {
		var a = Array.prototype.slice.call(arguments);
		a.unshift(this.debug_indent), "undefined" != typeof print && print.apply(print, a), "undefined" != typeof console && "undefined" != typeof console.log && console.log.apply(null, a)
	}, f.prototype.loop_re_over_block = function(a, b, c) {
		for (var d, e = b.valueOf(); e.length && null !== (d = a.exec(e));) e = e.substr(d[0].length), c.call(this, d);
		return e
	}, f.buildBlockOrder = function(a) {
		var b = [];
		for (var c in a)"__order__" !== c && "__call__" !== c && b.push(c);
		a.__order__ = b
	}, f.buildInlinePatterns = function(a) {
		var b = [];
		for (var c in a) if (!c.match(/^__.*__$/)) {
			var d = c.replace(/([\\.*+?|()\[\]{}])/g, "\\$1").replace(/\n/, "\\n");
			b.push(1 === c.length ? d : "(?:" + d + ")")
		}
		b = b.join("|"), a.__patterns__ = b;
		var e = a.__call__;
		a.__call__ = function(a, c) {
			return void 0 !== c ? e.call(this, a, c) : e.call(this, a, b)
		}
	};
	var i = b.extract_attr;
	f.renderJsonML = function(a, b) {
		b = b || {}, b.root = b.root || !1;
		var c = [];
		if (b.root) c.push(k(a));
		else for (a.shift(), !a.length || "object" != typeof a[0] || a[0] instanceof Array || a.shift(); a.length;) c.push(k(a.shift()));
		return c.join("\n\n")
	}, f.toHTMLTree = function(a, b, c) {
		"string" == typeof a && (a = this.parse(a, b));
		var d = i(a),
			e = {};
		d && d.references && (e = d.references);
		var f = l(a, e, c);
		return m(f), f
	}, f.toHTML = function(a, b, c) {
		var d = this.toHTMLTree(a, b, c);
		return this.renderJsonML(d)
	};
	var n = {};
	n.inline_until_char = function(a, b) {
		for (var c = 0, d = [];;) {
			if (a.charAt(c) === b) return c++, [c, d];
			if (c >= a.length) return null;
			var e = this.dialect.inline.__oneElement__.call(this, a.substr(c));
			c += e[0], d.push.apply(d, e.slice(1))
		}
	}, n.subclassDialect = function(a) {
		function b() {}
		function c() {}
		return b.prototype = a.block, c.prototype = a.inline, {
			block: new b,
			inline: new c
		}
	};
	var o = b.forEach,
		i = b.extract_attr,
		g = b.mk_block,
		p = b.isEmpty,
		q = n.inline_until_char,
		r = {
			block: {
				atxHeader: function(a, b) {
					var c = a.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);
					if (!c) return void 0;
					var d = ["header",
					{
						level: c[1].length
					}];
					return Array.prototype.push.apply(d, this.processInline(c[2])), c[0].length < a.length && b.unshift(g(a.substr(c[0].length), a.trailing, a.lineNumber + 2)), [d]
				},
				setextHeader: function(a, b) {
					var c = a.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);
					if (!c) return void 0;
					var d = "=" === c[2] ? 1 : 2,
						e = ["header",
						{
							level: d
						},
						c[1]];
					return c[0].length < a.length && b.unshift(g(a.substr(c[0].length), a.trailing, a.lineNumber + 2)), [e]
				},
				code: function(a, b) {
					var c = [],
						d = /^(?: {0,3}\t| {4})(.*)\n?/;
					if (!a.match(d)) return void 0;
					a: for (;;) {
						var e = this.loop_re_over_block(d, a.valueOf(), function(a) {
							c.push(a[1])
						});
						if (e.length) {
							b.unshift(g(e, a.trailing));
							break a
						}
						if (!b.length) break a;
						if (!b[0].match(d)) break a;
						c.push(a.trailing.replace(/[^\n]/g, "").substring(2)), a = b.shift()
					}
					return [["code_block", c.join("\n")]]
				},
				horizRule: function(a, b) {
					var c = a.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);
					if (!c) return void 0;
					var d = [
						["hr"]
					];
					if (c[1]) {
						var e = g(c[1], "", a.lineNumber);
						d.unshift.apply(d, this.toTree(e, []))
					}
					return c[3] && b.unshift(g(c[3], a.trailing, a.lineNumber + 1)), d
				},
				lists: function() {
					function e(b) {
						return new RegExp("(?:^(" + d + "{0," + b + "} {0,3})(" + a + ")\\s+)|" + "(^" + d + "{0," + (b - 1) + "}[ ]{0,4})")
					}
					function f(a) {
						return a.replace(/ {0,3}\t/g, "    ")
					}
					function h(a, b, c, d) {
						if (b) return a.push(["para"].concat(c)), void 0;
						var e = a[a.length - 1] instanceof Array && "para" === a[a.length - 1][0] ? a[a.length - 1] : a;
						d && a.length > 1 && c.unshift(d);
						for (var f = 0; f < c.length; f++) {
							var g = c[f],
								h = "string" == typeof g;
							h && e.length > 1 && "string" == typeof e[e.length - 1] ? e[e.length - 1] += g : e.push(g)
						}
					}
					function i(a, b) {
						for (var c = new RegExp("^(" + d + "{" + a + "}.*?\\n?)*$"), e = new RegExp("^" + d + "{" + a + "}", "gm"), f = []; b.length > 0 && c.exec(b[0]);) {
							var h = b.shift(),
								i = h.replace(e, "");
							f.push(g(i, h.trailing, h.lineNumber))
						}
						return f
					}
					function j(a, b, c) {
						var d = a.list,
							e = d[d.length - 1];
						if (!(e[1] instanceof Array && "para" === e[1][0])) if (b + 1 === c.length) e.push(["para"].concat(e.splice(1, e.length - 1)));
						else {
							var f = e.pop();
							e.push(["para"].concat(e.splice(1, e.length - 1)), f)
						}
					}
					var a = "[*+-]|\\d+\\.",
						b = /[*+-]/,
						c = new RegExp("^( {0,3})(" + a + ")[ 	]+"),
						d = "(?: {0,3}\\t| {4})";
					return function(a, d) {
						function k(a) {
							var c = b.exec(a[2]) ? ["bulletlist"] : ["numberlist"];
							return l.push({
								list: c,
								indent: a[1]
							}), c
						}
						var g = a.match(c);
						if (!g) return void 0;
						for (var n, r, l = [], m = k(g), p = !1, q = [l[0].list];;) {
							for (var s = a.split(/(?=\n)/), t = "", u = "", v = 0; v < s.length; v++) {
								u = "";
								var w = s[v].replace(/^\n/, function(a) {
									return u = a, ""
								}),
									x = e(l.length);
								if (g = w.match(x), void 0 !== g[1]) {
									t.length && (h(n, p, this.processInline(t), u), p = !1, t = ""), g[1] = f(g[1]);
									var y = Math.floor(g[1].length / 4) + 1;
									if (y > l.length) m = k(g), n.push(m), n = m[1] = ["listitem"];
									else {
										var z = !1;
										for (r = 0; r < l.length; r++) if (l[r].indent === g[1]) {
											m = l[r].list, l.splice(r + 1, l.length - (r + 1)), z = !0;
											break
										}
										z || (y++, y <= l.length ? (l.splice(y, l.length - y), m = l[y - 1].list) : (m = k(g), n.push(m))), n = ["listitem"], m.push(n)
									}
									u = ""
								}
								w.length > g[0].length && (t += u + w.substr(g[0].length))
							}
							t.length && (h(n, p, this.processInline(t), u), p = !1, t = "");
							var A = i(l.length, d);
							A.length > 0 && (o(l, j, this), n.push.apply(n, this.toTree(A, [])));
							var B = d[0] && d[0].valueOf() || "";
							if (!B.match(c) && !B.match(/^ /)) break;
							a = d.shift();
							var C = this.dialect.block.horizRule(a, d);
							if (C) {
								q.push.apply(q, C);
								break
							}
							o(l, j, this), p = !0
						}
						return q
					}
				}(),
				blockquote: function(a, b) {
					if (!a.match(/^>/m)) return void 0;
					var c = [];
					if (">" !== a[0]) {
						for (var d = a.split(/\n/), e = [], f = a.lineNumber; d.length && ">" !== d[0][0];) e.push(d.shift()), f++;
						var h = g(e.join("\n"), "\n", a.lineNumber);
						c.push.apply(c, this.processBlock(h, [])), a = g(d.join("\n"), a.trailing, f)
					}
					for (; b.length && ">" === b[0][0];) {
						var j = b.shift();
						a = g(a + a.trailing + j, j.trailing, a.lineNumber)
					}
					var k = a.replace(/^> ?/gm, ""),
						m = (this.tree, this.toTree(k, ["blockquote"])),
						n = i(m);
					return n && n.references && (delete n.references, p(n) && m.splice(1, 1)), c.push(m), c
				},
				referenceDefn: function(a, b) {
					var c = /^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;
					if (!a.match(c)) return void 0;
					i(this.tree) || this.tree.splice(1, 0, {});
					var d = i(this.tree);
					void 0 === d.references && (d.references = {});
					var e = this.loop_re_over_block(c, a, function(a) {
						a[2] && "<" === a[2][0] && ">" === a[2][a[2].length - 1] && (a[2] = a[2].substring(1, a[2].length - 1));
						var b = d.references[a[1].toLowerCase()] = {
							href: a[2]
						};
						void 0 !== a[4] ? b.title = a[4] : void 0 !== a[5] && (b.title = a[5])
					});
					return e.length && b.unshift(g(e, a.trailing)), []
				},
				para: function(a) {
					return [["para"].concat(this.processInline(a))]
				}
			},
			inline: {
				__oneElement__: function(a, b, c) {
					var d, e;
					b = b || this.dialect.inline.__patterns__;
					var f = new RegExp("([\\s\\S]*?)(" + (b.source || b) + ")");
					if (d = f.exec(a), !d) return [a.length, a];
					if (d[1]) return [d[1].length, d[1]];
					var e;
					return d[2] in this.dialect.inline && (e = this.dialect.inline[d[2]].call(this, a.substr(d.index), d, c || [])), e = e || [d[2].length, d[2]]
				},
				__call__: function(a, b) {
					function e(a) {
						"string" == typeof a && "string" == typeof c[c.length - 1] ? c[c.length - 1] += a : c.push(a)
					}
					for (var d, c = []; a.length > 0;) d = this.dialect.inline.__oneElement__.call(this, a, b, c), a = a.substr(d.shift()), o(d, e);
					return c
				},
				"]": function() {},
				"}": function() {},
				__escape__: /^\\[\\`\*_{}\[\]()#\+.!\-]/,
				"\\": function(a) {
					return this.dialect.inline.__escape__.exec(a) ? [2, a.charAt(1)] : [1, "\\"]
				},
				"![": function(a) {
					var b = a.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);
					if (b) {
						b[2] && "<" === b[2][0] && ">" === b[2][b[2].length - 1] && (b[2] = b[2].substring(1, b[2].length - 1)), b[2] = this.dialect.inline.__call__.call(this, b[2], /\\/)[0];
						var c = {
							alt: b[1],
							href: b[2] || ""
						};
						return void 0 !== b[4] && (c.title = b[4]), [b[0].length, ["img", c]]
					}
					return b = a.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/), b ? [b[0].length, ["img_ref",
					{
						alt: b[1],
						ref: b[2].toLowerCase(),
						original: b[0]
					}]] : [2, "!["]
				},
				"[": function Q(a) {
					var b = String(a),
						c = q.call(this, a.substr(1), "]");
					if (!c) return [1, "["];
					var Q, f, d = 1 + c[0],
						e = c[1];
					a = a.substr(d);
					var g = a.match(/^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);
					if (g) {
						var h = g[1];
						if (d += g[0].length, h && "<" === h[0] && ">" === h[h.length - 1] && (h = h.substring(1, h.length - 1)), !g[3]) for (var i = 1, j = 0; j < h.length; j++) switch (h[j]) {
						case "(":
							i++;
							break;
						case ")":
							0 === --i && (d -= h.length - j, h = h.substring(0, j))
						}
						return h = this.dialect.inline.__call__.call(this, h, /\\/)[0], f = {
							href: h || ""
						}, void 0 !== g[3] && (f.title = g[3]), Q = ["link", f].concat(e), [d, Q]
					}
					return g = a.match(/^\s*\[(.*?)\]/), g ? (d += g[0].length, f = {
						ref: (g[1] || String(e)).toLowerCase(),
						original: b.substr(0, d)
					}, Q = ["link_ref", f].concat(e), [d, Q]) : 1 === e.length && "string" == typeof e[0] ? (f = {
						ref: e[0].toLowerCase(),
						original: b.substr(0, d)
					}, Q = ["link_ref", f, e[0]], [d, Q]) : [1, "["]
				},
				"<": function(a) {
					var b;
					return null !== (b = a.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/)) ? b[3] ? [b[0].length, ["link",
					{
						href: "mailto:" + b[3]
					},
					b[3]]] : "mailto" === b[2] ? [b[0].length, ["link",
					{
						href: b[1]
					},
					b[1].substr("mailto:".length)]] : [b[0].length, ["link",
					{
						href: b[1]
					},
					b[1]]] : [1, "<"]
				},
				"`": function(a) {
					var b = a.match(/(`+)(([\s\S]*?)\1)/);
					return b && b[2] ? [b[1].length + b[2].length, ["inlinecode", b[3]]] : [1, "`"]
				},
				"  \n": function() {
					return [3, ["linebreak"]]
				}
			}
		};
	r.inline["**"] = s("strong", "**"), r.inline.__ = s("strong", "__"), r.inline["*"] = s("em", "*"), r.inline._ = s("em", "_"), f.dialects.Gruber = r, f.buildBlockOrder(f.dialects.Gruber.block), f.buildInlinePatterns(f.dialects.Gruber.inline);
	var t = n.subclassDialect(r),
		i = b.extract_attr,
		o = b.forEach;
	t.processMetaHash = function(a) {
		for (var b = u(a), c = {}, d = 0; d < b.length; ++d) if (/^#/.test(b[d])) c.id = b[d].substring(1);
		else if (/^\./.test(b[d])) c["class"] = c["class"] ? c["class"] + b[d].replace(/./, " ") : b[d].substring(1);
		else if (/\=/.test(b[d])) {
			var e = b[d].split(/\=/);
			c[e[0]] = e[1]
		}
		return c
	}, t.block.document_meta = function(a) {
		if (a.lineNumber > 1) return void 0;
		if (!a.match(/^(?:\w+:.*\n)*\w+:.*$/)) return void 0;
		i(this.tree) || this.tree.splice(1, 0, {});
		var b = a.split(/\n/);
		for (var c in b) {
			var d = b[c].match(/(\w+):\s*(.*)$/),
				e = d[1].toLowerCase(),
				f = d[2];
			this.tree[1][e] = f
		}
		return []
	}, t.block.block_meta = function(a) {
		var b = a.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);
		if (!b) return void 0;
		var d, c = this.dialect.processMetaHash(b[2]);
		if ("" === b[1]) {
			var e = this.tree[this.tree.length - 1];
			if (d = i(e), "string" == typeof e) return void 0;
			d || (d = {}, e.splice(1, 0, d));
			for (var f in c) d[f] = c[f];
			return []
		}
		var g = a.replace(/\n.*$/, ""),
			h = this.processBlock(g, []);
		d = i(h[0]), d || (d = {}, h[0].splice(1, 0, d));
		for (var f in c) d[f] = c[f];
		return h
	}, t.block.definition_list = function(a, b) {
		var e, f, c = /^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,
			d = ["dl"];
		if (!(f = a.match(c))) return void 0;
		for (var g = [a]; b.length && c.exec(b[0]);) g.push(b.shift());
		for (var h = 0; h < g.length; ++h) {
			var f = g[h].match(c),
				i = f[1].replace(/\n$/, "").split(/\n/),
				j = f[2].split(/\n:\s+/);
			for (e = 0; e < i.length; ++e) d.push(["dt", i[e]]);
			for (e = 0; e < j.length; ++e) d.push(["dd"].concat(this.processInline(j[e].replace(/(\n)\s+/, "$1"))))
		}
		return [d]
	}, t.block.table = function Y(a) {
		var e, f, b = function(a, b) {
				b = b || "\\s", b.match(/^[\\|\[\]{}?*.+^$]$/) && (b = "\\" + b);
				for (var e, c = [], d = new RegExp("^((?:\\\\.|[^\\\\" + b + "])*)" + b + "(.*)"); e = a.match(d);) c.push(e[1]), a = e[2];
				return c.push(a), c
			},
			c = /^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,
			d = /^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/;
		if (f = a.match(c)) f[3] = f[3].replace(/^\s*\|/gm, "");
		else if (!(f = a.match(d))) return void 0;
		var Y = ["table", ["thead", ["tr"]],
			["tbody"]
		];
		f[2] = f[2].replace(/\|\s*$/, "").split("|");
		var g = [];
		for (o(f[2], function(a) {
			a.match(/^\s*-+:\s*$/) ? g.push({
				align: "right"
			}) : a.match(/^\s*:-+\s*$/) ? g.push({
				align: "left"
			}) : a.match(/^\s*:-+:\s*$/) ? g.push({
				align: "center"
			}) : g.push({})
		}), f[1] = b(f[1].replace(/\|\s*$/, ""), "|"), e = 0; e < f[1].length; e++) Y[1][1].push(["th", g[e] || {}].concat(this.processInline(f[1][e].trim())));
		return o(f[3].replace(/\|\s*$/gm, "").split("\n"), function(a) {
			var c = ["tr"];
			for (a = b(a, "|"), e = 0; e < a.length; e++) c.push(["td", g[e] || {}].concat(this.processInline(a[e].trim())));
			Y[2].push(c)
		}, this), [Y]
	}, t.inline["{:"] = function(a, b, c) {
		if (!c.length) return [2, "{:"];
		var d = c[c.length - 1];
		if ("string" == typeof d) return [2, "{:"];
		var e = a.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);
		if (!e) return [2, "{:"];
		var f = this.dialect.processMetaHash(e[1]),
			g = i(d);
		g || (g = {}, d.splice(1, 0, g));
		for (var h in f) g[h] = f[h];
		return [e[0].length, ""]
	}, f.dialects.Maruku = t, f.dialects.Maruku.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/, f.buildBlockOrder(f.dialects.Maruku.block), f.buildInlinePatterns(f.dialects.Maruku.inline), a.Markdown = f, a.parse = f.parse, a.toHTML = f.toHTML, a.toHTMLTree = f.toHTMLTree, a.renderJsonML = f.renderJsonML
}(exports);