"use strict";
(function(){
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function(){});
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
  var hatte = !!navigator.serviceWorker.controller, neu = false;
  navigator.serviceWorker.addEventListener("controllerchange", function(){
    if (!hatte || neu) return;
    neu = true; location.reload();
  });
  window.addEventListener("load", function(){
    navigator.serviceWorker.register("sw.js").catch(function(e){ console.warn("Service Worker:", e); });
  });
})();
