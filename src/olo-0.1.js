// version 0.1
var olo     = (function () {
  var ky,
    hs      = 'www.oohlalog.com',
    pr      = 'http',
    vchrs   = /^[\],:{}\s]*$/,
    vesc    = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
    vtks    = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    vbrc    = /(?:^|:|,)(?:\s*\[)+/g,
    prs     = function (d) {
      if (typeof d !== "string" || !d) {
        return null;
      }
      d     = d.replace(/^\s+|\s+$/g, '');
      if (window.JSON && window.JSON.parse) {
        return window.JSON.parse(d);
      }
      if (vchrs.test(d.replace(vesc, "@")
        .replace(vtks, "]")
        .replace(vbrc, ""))) {
        return (new Function("return " + d))();
      }
      throw 'OohLaLog: invalid json';
    },
    ajx       = function (url,cfg,cb,co) {
      var xhr;
      if (typeof XMLHttpRequest !== 'undefined') {
        xhr   = new XMLHttpRequest();
      } else {
        var ver = ["Microsoft.XmlHttp", "MSXML2.XmlHttp", "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.4.0", "MSXML2.XmlHttp.5.0"];
        for (var i = 0, len = ver.length; i < len; i++) {
          try {
            xhr = new ActiveXObject(ver[i]);
            break;
          } catch (e) {}
        } // end for
      }
      var rdy = function () {
        if (xhr.readyState < 4) return;
        if (xhr.status !== 200) return;
        if (xhr.readyState === 4 && cb) cb(prs(xhr.responseText));
      }
      xhr.onreadystatechange = rdy;
      xhr.open('POST', pr+'://'+hs+url, true);
      xhr.setRequestHeader("Content-type", co=='json'?'application/json':'application/x-www-form-urlencoded');
      var str = ''
      if (co!='json') {
        for (var k in cfg) {
          if (cfg[k]) {
            if (str) str += '&';
            str += (k + '=' + encodeURI(cfg[k]));
          }
        }
      } else {
        if (typeof JSON !== 'undefined') str = JSON.stringify(cfg);
        else throw 'OohLaLog: JSON encoding not supported by this browser'
      }
      xhr.send(str);
    },
    exc      = function (bas, cfg) {
      cfg    = cfg || {};
      var cb = cfg.callback,
          co = cfg.type,
          k  = cfg.apiKey;
      ky = k || ky;
      if (!ky) throw 'OohLaLog: API Key not set';
      delete cfg.callback;
      delete cfg.type;
      delete cfg.apiKey;
      ajx((bas+'?apiKey='+ky), cfg, co)
    },
    ct       = function(c,i,n,b,k) {
      if (!c) throw 'OohLaLog: counter code is required';
      exc('/api/counter/increment.json', {code:c,name:n,incr:i,callback:b,apiKey:k});
    };
    lg       = function(l,c,m,d,p,t,b,k) {
      if (!m) throw 'OohLaLog: logging message is required';
      exc('/api/logging/save.json', {level:l,category:c||'default',message:m,details:d,priority:p,token:t,callback:b,apiKey:k});
    };
  return {
    setApiKey : function (_k) {ky = _k;return olo;},
    setHost   : function (_hs) {hs = _hs;return olo;},
    setProtocol : function (_pr) {pr = _pr;return olo;},
    count     : function(c,i,n,b,k) {ct(c,i,n,b);return olo;},
    info      : function(m,c,d,p,t,b,k) {lg('INFO',c,m,d,p,t,b,k);return olo;},
    warn      : function(m,c,d,p,t,b,k) {lg('WARN',c,m,d,p,t,b,k);return olo;},
    error     : function(m,c,d,p,t,b,k) {lg('ERROR',c,m,d,p,t,b,k);return olo;},
    debug     : function(m,c,d,p,t,b,k) {lg('DEBUG',c,m,d,p,t,b,k);return olo;},
    trace     : function(m,c,d,p,t,b,k) {lg('TRACE',c,m,d,p,t,b,k);return olo;},
    kateUpton : function(c,n,b,k) {ct(c,10,n,b,k);return olo;},
    magda     : function(c,n,b,k) {ct(c,-1,n,b,k);return olo;},
    beiber    : function(c,n,b,k) {ct(c,-100000,n,b,k);return olo;},
    jackBauer : function(c,n,b,k) {ct(c,24,n,b,k);return olo;},
    vinDiesel : function(c,n,b,k) {ct(c,30,n,b,k);return olo;},
    chuckNorris : function(c,n,b,k) {ct(c,1000000,n,b,k);return olo;},
    garyOldman: function (c,n,i,b,k) {ct(c,i,n,b,k);return olo;},
    counter   : {
      get      : function(cfg) {exc('/api/counter/show.json', cfg);return olo;},
      increment: function(cfg) {exc('/api/counter/increment.json', cfg);return olo;},
      reset    : function(cfg) {exc('/api/counter/reset.json', cfg);return olo;}
    },
    logger    : {
      get      : function(cfg) {exc('/api/logging/show.json', cfg);return olo;},
      save     : function(cfg) {exc('/api/logging/save.json', cfg);return olo;},
      delete   : function(cfg) {exc('/api/logging/delete.json', cfg);return olo;}
    }
  }
})();