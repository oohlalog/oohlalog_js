oohlalog_js
===========

*JavaScript API:*

```javascript
olo.count(code,incr,name+,callback+, apiKey+)
olo.info(msg,category,details+,priority+,token+,callback+,apiKey+)
olo.warn(msg,category,details+,priority+,token+,callback+,apiKey+)
olo.error(msg,category,details+,priority+,token+,callback+,apiKey+)
olo.debug(msg,category,details+,priority+,token+,callback+,apiKey+)
olo.trace(msg,category,details+,priority+,token+,callback+,apiKey+)
```

+optional

*Low Level API:*

```javascript
olo.counter.get(cfg)
olo.counter.increment(cfg)
olo.counter.reset(cfg)
olo.logger.get(cfg)
olo.logger.save(cfg)
olo.logger.delete(cfg)
```

*Examples:*
```javascript
olo.setApiKey('XXXX-XXXX-XXXXXXXXX-XXXX');	

olo.counter.increment({code:'TEST-CT-1',callback:function(obj){alert('success='+obj.success)}});
olo.counter.get({code:'TEST-CT-1',callback:function(obj){alert('count='+obj.data.count)}});
olo.warn('my msg','my cat');
olo.logger.save({category:'spanky',level:'DEBUG',message:'Howdy',callback:function(obj){alert('success='+obj.success)}});
olo.trace('my msg','my cat');

```


All methods support chaining.
