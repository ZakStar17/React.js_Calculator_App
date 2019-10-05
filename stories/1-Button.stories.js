import React from 'react';
import App from '../app/App.js'
import '../app/index.css';


export default {
  title: 'The Calculator App',
};


export const Notes = () => (
  <div>
    <h2>What doesn't work yet</h2>
    <p>2(2) or (2)2 don't return the correct value, because when the function decompiles the expression it doesn't find any * operators;</p>
    <p>The calculator don't have memory (M, M+, etc.) because i don't wanted to add some buttons to only have 1 memory slot, and it will took some time to make a decent memory system;</p>
    <p>The page has no css to organize and fit history and the page is not proportional to the width of the devices.</p>
    <p>The calculator don't show errors to the user</p>

    <h2>Beneficts</h2>
    <p>The calculator can execute many operations at once without needing to retype;</p>
    <p>The calculator has parentheses and they can typed in (2+3)(1/5) format;</p>
    <p>The input can be pasted and typed without the need to click on the buttons;</p>
    <p>Some simbols like √ and ^ can be quickly typed with the shortcuts r and t.</p>
  </div>
);

export const Calculator = () => (
  <App />
);
