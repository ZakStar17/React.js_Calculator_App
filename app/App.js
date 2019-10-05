import React, { Component } from 'react'


function CalcButtons(props) { // sorry for this weird code, but i think this is better that add more functions
  return (
    <div>
      <button onClick={() => props.onRemoveSymbol(2)}>CE</button>
      <button onClick={() => props.onRemoveSymbol(1)}>C</button>
      <button onClick={() => props.onAddSymbol('(')}>(</button>
      <button onClick={() => props.onAddSymbol(')')}>)</button> <br />

      <button onClick={() => props.onAddSymbol('√')}>√</button>
      <button onClick={() => props.onAddSymbol('^')}>^</button>
      <button onClick={() => props.onRemoveSymbol(0)} id="remove">⌫</button>
      <button onClick={() => props.onAddSymbol('*')}>*</button> <br />

      <button className="number" onClick={() => props.onAddSymbol('7')}>7</button>
      <button className="number" onClick={() => props.onAddSymbol('8')}>8</button>
      <button className="number" onClick={() => props.onAddSymbol('9')}>9</button>
      <button onClick={() => props.onAddSymbol('/')}>/</button> <br />

      <button className="number" onClick={() => props.onAddSymbol('4')}>4</button>
      <button className="number" onClick={() => props.onAddSymbol('5')}>5</button>
      <button className="number" onClick={() => props.onAddSymbol('6')}>6</button>
      <button onClick={() => props.onAddSymbol('+')}>+</button> <br />

      <button className="number" onClick={() => props.onAddSymbol('1')}>1</button>
      <button className="number" onClick={() => props.onAddSymbol('2')}>2</button>
      <button className="number" onClick={() => props.onAddSymbol('3')}>3</button>
      <button onClick={() => props.onAddSymbol('-')}>-</button> <br />

      <button onClick={() => props.onAddSymbol('e')}>e</button>
      <button className="number" onClick={() => props.onAddSymbol('0')}>0</button>
      <button onClick={() => props.onAddSymbol('.')}>.</button>
      <button id="equal" onClick={() => props.onCalculate()}>=</button> <br />
    </div>
  )
}

function History(props) {
  /* this option with a dicionary will be not organized
    let keyList = [];
  for (let key in props.dictionary) {
    keyList.push(key);
  } */

  let keys = props.keys;
  let values = props.values;
  return (
    <ul className="historyObject">
    {keys.map((key, index) => (
      <li key={index}>
        <p>{values[index]} =</p>
        <p>{key} </p>
        </li>
    ))}
    </ul>
  )
}

class App extends Component { // main component
  constructor(props) {
    super(props)
    this.state = { // initialize the state
        input: '',
        historyValues: [],
        historyKeys: [],
        lastResult: ""
    }
    this.updateInput = this.updateInput.bind(this) // bind the functions
    this.calculate = this.calculate.bind(this) 
    this.addSymbol = this.addSymbol.bind(this) 
    this.removeSymbol = this.removeSymbol.bind(this) 
  }

  componentDidMount() {
    let input = document.getElementById("mainInput");

    // Check if the user clicks enter when typing in the Calculator Input
    input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {                        // enter key
      document.getElementById("equal").click();
    }
    });
  }


  updateInput(e) {
      let value = e.target.value;
      let oldInput = this.state.input;
      this.state.input = value;

      if (oldInput.length < value.length) {
        let newInput = (value.slice(oldInput.length, value.length));
        if (oldInput == this.state.lastResult && /\d/.test(newInput)) { // clear the input if the user types a number after a calculation
          value = newInput;
          this.state.lastResult = "";
        }
      }
      
      // pattern to fillter (search for numbers and normal operators of a calculator)
      const patt1 = /[\d]|[.]|[+]|[-]|[*]|[/]|[x]|[:]|[(]|[)]|[\[]|[\]]|[e]|[r]|[√]|[t]|[\^]/g;
      let inputFiltered = value.match(patt1);  // filter the previous value

      

      var inputResult = "";  // variable that will be used in the for loop

      if (inputFiltered != null) {  // test if the filtered value isn't null
          for (let k = 0; k < inputFiltered.length; k++) {
            let adicionalValue = inputFiltered[k] // value to add
            if (adicionalValue == 'x') {  // watch if there are no 'x' and ':' for example to convert
              adicionalValue = '*';
            }
            else if (adicionalValue == ':') {
              adicionalValue = '/';
            }
            else if (adicionalValue == '[') {
              adicionalValue = '(';
            }
            else if (adicionalValue == ']') {
              adicionalValue = ')';
            }
            else if (adicionalValue == 'r') {
              adicionalValue = '√';
            }
            else if (adicionalValue == 't') {
              adicionalValue = '^';
            }

             inputResult += adicionalValue  // add the value
          }
      }
      this.setState({input: inputResult}) // update the state with the updated input value
    }


addSymbol(type) { // the buttons add the input by this function
  let value = this.state.input;
  if (value == this.state.lastResult && /\d/.test(type)) {
    value = "";
    this.state.lastResult = "";
  }
  value += type
  this.setState({input: value})
}

removeSymbol(type) { // function for clear the input or even everything
  let value = this.state.input;
  let historyValues = this.state.historyValues;
  let historyKeys = this.state.historyKeys;
  switch (type) {
    case 0:
      value = value.slice(0, value.length - 1);
      break
    case 1:
      value = "";
      break
    case 2:
      value = "";
      historyValues = [];
      historyKeys = [];

      
  }
  this.setState({input: value, historyValues: historyValues, historyKeys: historyKeys})
}
  
  
calculate(e) { // main calculating function with the higest level of abstraction
  let value = this.state.input; // get the value of the input
  console.log(value);
  let calcArray = []; // initialize the array where the calculations will happen
  
  if (value != null) { // if there are something to calculate
    // divide the input value in portions (whatch the function)
    calcArray = organizeCalcString(0,value.length,value);  

    // this block will seach for individual groups of parentheses to simplify them
    let GroupStart = calcArray.indexOf('('); // the first occurence of the open parentheses
    while (GroupStart != -1) { // the loop will only end when all parentheses will be deleted
      
      let anotherGroup = calcArray.indexOf('(', GroupStart + 1); // this will watch if there are no subgrups of parentheses
      let GroupEnd = calcArray.indexOf(')', GroupStart + 1);
      if (calcArray.indexOf('(') == -1) {
        break
      }
      // if there are a subgrup (a open parentheses is inside a open and a close parentheses) the loop will continue within the subgrup:
      if (anotherGroup < GroupEnd && anotherGroup != -1) { 
        GroupStart = anotherGroup;
        continue
      }
      else { // if the loop finds a existing group
        let internalArray = calcArray.slice(GroupStart + 1, GroupEnd); // will create a new array with only the group
        for (let k = GroupStart; k < GroupEnd + 1; k++) { // this will delete the group from the main array
          delete calcArray[k] 
        }

        while (true) {
          let index = internalArray.indexOf('^'); // I can place this in a function, but is so small code and i don't want to make performance worse
          if (index == -1) {
            break
          }
          else {
            calc2Numbers(index, '^', internalArray)
          }
        }
        executeSquareRoot(internalArray); // all the operations will happen in this group
        Execute2types('*', '/', internalArray);
        Execute2types('+', '-', internalArray);

        calcArray[GroupStart] = parseFloat(internalArray.join("")); // the final value will be calculated and added to the main array
        if (calcArray.lastIndexOf('(') < GroupStart) {
          GroupStart = 0; // if there are parent groups to be executed, the loop will start the seach again from the beginning
        }
      }
    }
  }
  else { // if there are nothing finish the main function
    return null
  }
console.log(calcArray);

while (true) {
  let index = calcArray.indexOf('^')
  if (index == -1) {
    break
  }
  else {
    calc2Numbers(index, '^', calcArray)
  }
}
executeSquareRoot(calcArray); // do the operations again to the parent group (without any parentheses)
Execute2types('*', '/', calcArray);
Execute2types('+', '-', calcArray);
  
let finalValue = calcArray.join(""); // join the final group and aply the result
console.log(finalValue);
let historyValues = this.state.historyValues;  // update the history
let historyKeys = this.state.historyKeys;
if (finalValue != "") {
  historyValues.push(value);
  historyKeys.push(finalValue);

}

console.log(historyKeys);
this.setState({input: finalValue, historyValues: historyValues, lastResult: finalValue, historyKeys: historyKeys}) // aply everything
}
  
render() {
  return(
    <div className="calculator">
      <div className="column1">
        <input
          id='mainInput'
          type='text'
          value={this.state.input}
          onChange={this.updateInput}
          autoFocus
        />
        <CalcButtons 
          onAddSymbol = {this.addSymbol}
          onRemoveSymbol = {this.removeSymbol}
          onCalculate = {this.calculate}
        />
      </div>
      <div className="column2">
      <History 
        values={this.state.historyValues}
        keys={this.state.historyKeys}
      />
      </div>
    </div>
  )
}
}


// this function will transform a value string into a array where the values can be calculated
function organizeCalcString(start,end,calcString) { 
let returnArray = []; // the array that will be returned
let numberToAdd = ""; // the number values will be stored in this array

for (let k = start; k < end; k++) { // this loop will iterate with all of character of the value
  let charToTest = calcString[k]; // the current character
  if (/\d|[.]|[e]/.test(charToTest)) { // this patern will test if it is part of a number
    numberToAdd += charToTest; // will store this character
  }
  else { // if the new character isn't a number
    if (numberToAdd != "") { // if there are a number to be added
      returnArray.push(parseFloat(numberToAdd));
      numberToAdd = "";
    }
    if (returnArray[k - 1] == ')' && charToTest == '(') { // if there are situations like (2+4)(2*3)
      returnArray.push('*'); // add a multiplication between the parentheses
    }
    returnArray.push(charToTest); // add the individual carater
  }
}
if (numberToAdd != "") { // if there are a forgotten number to be added
  returnArray.push(parseFloat(numberToAdd));
}
return returnArray
}


// because when a calculation occurs appear blank spaces in the array,
// this function will search the numbers and ignore the blank spaces
function findNumber(array, right, start) {
    if (right) {
      for (let k=1; k < array.length; k++) // seach to the right (positive)
      if (/\d/.test(array[start + k])) {
        return start + k
      } 
    }
    else {
      for (let k=-1; k < 0; k--) // search to the left (negative)
      if (/\d/.test(array[start + k])) {
        return start + k 
      }
    }
    return 'notFound'
  }

  // this function will execute the real calculations between two numbers
  function calc2Numbers(where, how, array) { // the how means what operation to execute
    let firstNumberLoc = findNumber(array, false, where); // will find the numbers what will be executed
    let secondNumberLoc = findNumber(array, true, where);
    let firstNumber = array[firstNumberLoc]; // will take the values
    let secondNumber = array[secondNumberLoc];
    switch (how) { // the operations
        case '*':
          array[where] = firstNumber * secondNumber;
          break;
        case '/':
          array[where] = firstNumber / secondNumber;
          break;
        case '+':
          array[where] = firstNumber + secondNumber;
          break;
        case '-':
          array[where] = firstNumber - secondNumber;
          break;
        case '^':
            array[where] = Math.pow(firstNumber, secondNumber);
          break;
    }
    delete array[firstNumberLoc] // will delete where the old numbers where
    delete array[secondNumberLoc]
  }

// this function will seach and calculate the square roots
function executeSquareRoot(array) { 
  while (true) {
    let squareRootLoc = array.indexOf('√');
    if (squareRootLoc != -1) {
      let targetLocation = findNumber(array, true, squareRootLoc);
      let targetNumber = array[targetLocation];
      array[targetLocation] = Math.sqrt(parseFloat(targetNumber));
      delete array[squareRootLoc]
    }
    else {
      return array
    }
  }
}


  // this function will seach and execute two tipes of operations
function Execute2types(first, second, array) { 
  let tentative = 0; // a prevention to if there are a error and while gets infinite
  while (true) {
    tentative++;
    let firstPos = array.indexOf(first); // first and second operations position
    let secondPos = array.indexOf(second);
    if (firstPos == -1 && secondPos == -1 || tentative > 1000) { // if there are no more operation of these two tipes
      break
  }
    else if ((firstPos < secondPos || secondPos == -1) && firstPos != -1) { // the first operation needs to be before the second
    calc2Numbers(firstPos, first, array); // do the operations (see the function)
      }
    else if (firstPos > secondPos || firstPos == -1) { // the contrary
      calc2Numbers(secondPos, second, array);
      }
    }
}

export {executeSquareRoot, Execute2types, organizeCalcString, App};

export default App