/* ============================================================
   VANMATHI — Forest Guard Shared Event Bus
   Cross-app state synchronization via postMessage + localStorage
   Works across iframes AND separate browser tabs
   ============================================================ */
var ForestSync = (function(){
  var STATE_KEY = 'vanmathi_shared_state';
  var EVENT_KEY = 'vanmathi_event_bus';
  var _source = 'unknown';
  var _listeners = {};

  function defaultState(){
    return {
      guard: {
        id:'VG-2026-047', name:'Rajesh Kumar',
        division:'Nallamala', zone:'B4',
        status:'active', isOffline:false,
        coords:{lat:15.685,lng:78.875}
      },
      mission: {
        id:'VM-2026-0142', type:'Forest Fire',
        zone:'Nallamala — Zone B4', severity:'High',
        status:'assigned',
        assignedAt:'2026-09-16T10:45:00',
        acceptedAt:null, resolvedAt:null
      },
      recentActivities: [],
      alerts: [],
      syncQueue: {pending:0, lastSync:null}
    };
  }

  function getState(){
    try{ return JSON.parse(localStorage.getItem(STATE_KEY)) || defaultState(); }
    catch(e){ return defaultState(); }
  }

  function saveState(state){
    try{ localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch(e){}
  }

  function updateState(updater){
    var state = getState();
    updater(state);
    saveState(state);
    return state;
  }

  function broadcast(type, data){
    var event = {type:type, data:data||{}, timestamp:Date.now(), source:_source};

    // 1) postMessage for iframe communication
    if(window.parent !== window){
      try{ window.parent.postMessage(event,'*'); } catch(e){}
    }
    var iframes = document.querySelectorAll('iframe');
    for(var i=0;i<iframes.length;i++){
      try{ iframes[i].contentWindow.postMessage(event,'*'); } catch(e){}
    }

    // 2) localStorage for cross-tab communication
    try{
      localStorage.setItem(EVENT_KEY, JSON.stringify(event));
      localStorage.removeItem(EVENT_KEY);
    } catch(e){}

    _fireLocal(event);
  }

  function _fireLocal(event){
    var handlers = _listeners[event.type] || [];
    for(var i=0;i<handlers.length;i++) handlers[i](event.data, event);
    var wild = _listeners['*'] || [];
    for(var j=0;j<wild.length;j++) wild[j](event.data, event);
  }

  function on(type, callback){
    if(!_listeners[type]) _listeners[type] = [];
    _listeners[type].push(callback);
  }

  function off(type, callback){
    if(!_listeners[type]) return;
    _listeners[type] = _listeners[type].filter(function(fn){ return fn !== callback; });
  }

  function init(source){
    _source = source;
    _listeners = {};

    // Listen for postMessage (iframe communication)
    window.addEventListener('message', function(e){
      if(!e.data || !e.data.type || !e.data.source) return;
      if(e.data.source === _source) return;
      if(e.data.type === 'LOCATE_ZONE') return;

      _fireLocal(e.data);

      if(window.parent === window){
        var iframes = document.querySelectorAll('iframe');
        for(var i=0;i<iframes.length;i++){
          try{
            if(e.source !== iframes[i].contentWindow){
              iframes[i].contentWindow.postMessage(e.data,'*');
            }
          } catch(ex){}
        }
      }
    });

    // Listen for localStorage changes (cross-tab communication)
    window.addEventListener('storage', function(e){
      if(e.key !== EVENT_KEY || !e.newValue) return;
      try{
        var event = JSON.parse(e.newValue);
        if(!event || !event.type || !event.source) return;
        if(event.source === _source) return;
        _fireLocal(event);
      } catch(ex){}
    });

    var state = getState();
    if(!state.mission) saveState(defaultState());
  }

  return {
    init:init, on:on, off:off,
    broadcast:broadcast,
    getState:getState, saveState:saveState, updateState:updateState
  };
})();
