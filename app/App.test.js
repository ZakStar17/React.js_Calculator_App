import * as app from './App'

let testExpression1 = '√4+5*2';
let testExpression2 = '16/√64+3';

let deconstructed1 = app.organizeCalcString(0, testExpression1.length, testExpression1);
let deconstructed2 = app.organizeCalcString(0, testExpression2.length, testExpression2);

console.log('first: ' + deconstructed1);
console.log('second: ' + deconstructed2);

test('Expression1 Works', () => {
    deconstructed1 = app.executeSquareRoot(deconstructed1);
    app.Execute2types('*', '/', deconstructed1);
    app.Execute2types('+', '-', deconstructed1);
    let finalValue1 = deconstructed1.join("");
    expect(finalValue1).toBe('12');
  });
  test('Expression2 Works', () => {
    deconstructed2 = app.executeSquareRoot(deconstructed2);
    app.Execute2types('*', '/', deconstructed2);
    app.Execute2types('+', '-', deconstructed2);
    let finalValue2 = deconstructed2.join("");
    expect(finalValue2).toBe('5');
  });

/* I tryed to do these things, but in either get a react console error

let oneApp = new app.App;

let eventVar = {target: {value: 'Bd32a1+4x3e2'}};
oneApp.updateInput(eventVar);
console.log(oneApp.state.input); 

oneApp.state.input = '√4+5*2^1';
oneApp.calculate('');
test('class', () => {
    expect(oneApp.state.input).toBe('12');
  });

*/