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
   console.log(msg, 'color:red; font-size:20px; font-weight:bold;');
   assertions.forEach( assertion => {
      msg = `%cAssertion failed:\nType: ${assertion.type}\n${assertion.string}\n`;
      if (assertion.isStringCompare) {
         console.log(
            msg,
            'color:red; font-size:15px;',
            'color:lime; font-size:15px; font-style:italic; font-weight:bold;',
            'color:red; font-size:15px; font-style:normal;',
            'color:lime; font-size:15px; font-style:italic;font-weight:bold;',
            'color:red; font-size:15px; font-style:normal;'
         );
      } else {
         console.log(
            msg,
            'color:red; font-size:15px;'
         )
      }
   });
}

let TJSassertions = [];

function assertEquals(a, b) {
   let msg;
   let isString = typeof(a) == 'string' && typeof(b) == 'string';
   if (isString) {
      const max = Math.max(a.length, b.length);
      for (let i = 0; i < max; i++) {
         if (a[i] != b[i]) {
            msg = `
            \nA: ${a.substring(0, i)}%c${a[i]}%c${a.substring(i+1)}\n\nB: ${b.substring(0, i)}%c${b[i]}%c${b.substring(i+1)}`;
         }
      }
   } else if (a == b) {
      msg = `\nType A: ${typeof(a)}\nType B: ${typeof(b)}\n\nA: ${a}\n\nB: ${b}`
   } else {
      msg = `\nA: ${a}\n\nB: ${b}`;
   }

   return TJSassertions.push({
      res: a === b,
      type: 'equals',
      string: msg,
      isStringCompare: isString
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