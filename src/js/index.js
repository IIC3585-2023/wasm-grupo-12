let n = 0;

function addInput() {
  let label = document.createElement('label');
  label.className = 'label';
  label.innerHTML = 'Time job ' + n;
  let input = document.createElement('input');
  input.className = 'input';
  input.type = 'number';
  input.name = 'job';
  input.id = 'job' + n;
  input.required = true;
  document.getElementById('time').appendChild(label);
  document.getElementById('time').appendChild(input);
  n = n + 1;
};

document.getElementById("test").onclick = () => {
  console.log("test pressed");
  const nClusters = parseInt(document.getElementById("clusters").value);
  console.log(`Number of clusters: ${nClusters}`);

  const listArray = Array.from(document.getElementsByName('job')).map(element => parseInt(element.value));
  console.log(`Jobs: ${listArray}`);
};