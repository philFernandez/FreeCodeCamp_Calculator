/* ToDo: Continue calculation from output of last calculation
 */
var buttons = $('button');
// array will hold expression input into calculator
var expression = [];

buttons.on('click', function(e) {
  // get value from button pressed; push to array
  var keyPressed = e.currentTarget.value;
  expression.push(keyPressed);
  // evaluate when = is entered
  if(keyPressed === '=') {
    // remove the expression from screen when = is entered to make way
    // for the result of the calculation.
    $('.output').remove();
    evalExpression(expression);
  }
  // clear screen
  else if(keyPressed === 'c') {
    expression = [];
    $('.output').remove();
    $('.screen').append('<p class="output">0</p>');
  }
  else if(keyPressed === '⬅') {
    expression = expression.slice(0, -2);
    $('.screen').children().last().remove();
  }
  else {
    // if the expression array only has a length of 1 this means that it either
    // just started and so has a 0 on screen, or it just finished a calculation
    // and has the answer on the screen. in either event we want to clear the
    // screen when entering new input. if there is only 1 element in the array
    // this would be the first element being added for a new calculation, so
    // clear the screen of either the 0 or the answer from the last
    // calculation.
    if (expression.length === 1) {
      $('.output').remove();
    }
    // screen has a max limit of 12 chars wide. this prints Err on the screen,
    // and resets the expression array
    if (expression.length === 13) {
      $('.output').remove(); // added semi colon
      var errOutput = '<p class="output err">Digit Limit</p>';
      $('.screen').append(errOutput);
      expression = [];
    }
    else {
      // put input expression on screen
      var exprOutput = '<p class="output">' + keyPressed + '</p>';
      $('.screen').append(exprOutput);
    }
  }
});

function evalExpression(expr) {

  var i = 0;
  var exprToEval = "";

  // append each element in expr array to string variable exprToEval
  // this stops when it encounters '=' in the array
  while(expr[i] !== '=') {
    exprToEval += expr[i];
    i++;
  }
  // use eval() to evaluate whatever expression we got out of the array
  // try block will catch any malformed expressions; instead of doing
  // calculation the error will be caught and a message will be displayed
  // on calculator screen, and error message in browser console.
  try {
    var result = eval(exprToEval);
    // limit any decimals to three places.
    // the + in front of result.toFixed(3) is
    // needed to drop any trailing 0's
    result = +result.toFixed(3);
    displayCalculation(result);
  }
  catch(e) {
    console.error(e);
    $('.output').remove();
    var invalidInputErr = '<p class="output err">Invalid Input</p>';
    $('.screen').append(invalidInputErr);
  }

  // reset main expression array (needs to be reset weather try fails or
  // succeeds)
  expression = [];


}

// put result on webpage (calculator screen)
function displayCalculation(result) {
  var domElement = '<p class="output">' + result + '</p>';
  $('.screen').append(domElement);
}


