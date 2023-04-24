let n = 0;
function addInput() {
  let label = document.createElement('label');
  label.className = 'label';
  label.innerHTML = 'Time job ' + n;
  let input = document.createElement('input');
  input.className = 'input';
  input.type = 'number';
  input.name = 'job' + n;
  input.required = true;
  document.getElementById('time').appendChild(label);
  document.getElementById('time').appendChild(input);
  n = n + 1;
};