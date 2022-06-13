function TJSgetTestFunctions(){
   let allFunctions = []; 
   for (let i in window) {
      if ((typeof window[i]).toString() == 'function'
      && window[i].name.match(/\w+Test$/)) {
         allFunctions.push(window[i].name);
      }
  }
  return allFunctions;
}

function TJSlogPass(test, runtime) {
   console.log(`%c${test}✅ \n%cRuntime≈${runtime.toFixed(6)}ms`,
   'color:green; font-size:20px; font-weight:bold;',
   '');
}

function TJSlogFail(test, assertions) {
   let msg = `%c${test}❌`;
   assertions.forEach( assertion => {
      msg += `\n%cAssertion failed:\nType: ${assertion.type}\n${assertion.string}`;
   });
   console.log(msg, 'color:red; font-size:20px; font-weight:bold;', 'color:red; font-size:15px;');
}

let TJSassertions = [];

function assertEquals(a, b) {
   return TJSassertions.push({
      res: a === b,
      type: 'equals',
      string: `A = ${a}, B = ${b}`
   });
}

function assertNotEquals(a, b) {
   return TJSassertions.push({
      res: a !== b,
      type: 'not equals',
      string: `A = ${a}, B = ${b}`
   });
}

function assertTrue(a) {
   return TJSassertions.push({
      res: a == true,
      type: 'is true',
      sring: `A = ${a}`
   });
}

function assertFalse(a) {
   return TJSassertions.push({
      res: a == false,
      type: 'is false',
      sring: `A = ${a}`
   });
}

window.addEventListener('DOMContentLoaded', () => {
   const testFunctions = TJSgetTestFunctions();

   testFunctions.forEach( testFunction => {
      try {
         beforeEach();
      } catch (error) {
         if (error.name != 'ReferenceError') {
            console.error(error);
         }
      }

      const start = performance.now();
      window[testFunction]();
      const end = performance.now();

      try {
         afterEach();
      } catch (error) {
         if (error.name != 'ReferenceError') {
            console.error(error);
         }
      }

      let failed = []
      TJSassertions.forEach( assertion => {
         if (assertion.res == false) {
            failed.push(assertion);
         }
      });

      if (failed.length == 0) {
         TJSlogPass(testFunction, end - start);
      } else {
         TJSlogFail(testFunction, failed);
      }

      TJSassertions = [];
   });
})