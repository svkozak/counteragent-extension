
browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "counteragent" ) {
      waitForElement('#div-gpt-ad').then(function(element) {
        if (element.style.display !== 'none') {
          counterAgentStrike(element);
        }
      });
    }
  }
);


function counterAgentStrike(element) {

    const agent = element;
    // Using encodeURI to avoid text endoding issues
    const warning = encodeURI("данное сообщение (материал) создано и (или) распространено иностранным средством массовой информации");
    const text = agent.firstChild.textContent.toLowerCase();

    if (text.includes(decodeURI(warning))) {
      console.log('Counter Agent strikes :)');
      agent.setAttribute('style', 'display: none;');
    }

}

function waitForElement(selector) {
  return new Promise(function(resolve, reject) {

      var element = document.querySelector(selector);
      if (element) {
          resolve(element);
          return;
      }

      var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              var nodes = Array.from(mutation.addedNodes);
              for (var node of nodes) {
                  if (node.querySelector) {
                      var element = node.querySelector(selector);
                      if (element && element.style.display !== 'none') {
                          observer.disconnect();
                          resolve(element);
                          return;
                      }
                  }
              };
          });
      });

      observer.observe(document.documentElement, { childList: true, subtree: true });

  });
}
