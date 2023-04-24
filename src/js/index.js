let n = 0;

const jsSolution = (N, M, times) => {
  const MAX_N = 1000
  const MAX_M = 1000

  // obtenido de https://stackoverflow.com/questions/5185864/javascript-quicksort
  function quicksort(array) {
    if (array.length <= 1) {
      return array;
    }

    var pivot = array[0];
    
    var left = []; 
    var right = [];

    for (var i = 1; i < array.length; i++) {
      array[i][1] < pivot[1] ? left.push(array[i]) : right.push(array[i]);
    }
    // return quicksort(left).concat(pivot, quicksort(right));
    return [...quicksort(left), pivot, ...quicksort(right)]
  };


  let N, M, i, j, k;
  let sum = Array.from({length: MAX_M}, (v, i) => 0);

  console.log(sum.length);

  // obtener input N y M
  // N = 5
  // M = 2
  // // obtener tiempos
  // const times = [30, 50, 10, 20, 90]
  let elements = Array.from({length: N}, (v, i) => [0, 0]);
  console.log(elements);

  for (let i = 0; i < N; i++) {
    elements[i][0] = times[i];
    elements[i][1] = i;
  }

  elements = quicksort(elements)

  for (let i = 0; i < N; i++) {
    let min_sum = sum[0];
    let min_index = 0;
    for (j = 1; j < M; j++) {
        if (sum[j] < min_sum) {
            min_sum = sum[j];
            min_index = j;
        }
    }
    sum[min_index] += elements[i][0];
    elements[i][0] = min_index; // Store the group of the element
  }

  // Print the group of each element
  console.log(elements.map((element => element[0])));
  const res = elements.map((element => element[0]));
  return res;
}

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
  console.log(`mJobs: ${listArray.length}`, 'n', nClusters);
  // ejecutar algoritmo en js
  let jsStart = Date.now();
  const res = jsSolution(nClusters, listArray.length, listArray)
  let jsEnd = Date.now();
  let duracion = jsEnd - jsStart
  console.log("Total time taken : " + duracion + " milliseconds");
  // poner tiempos en vista
  let inicio_p = document.createElement('p');
  inicio_p.innerHTML = `${jsStart}`;
  document.getElementById('inicio-js').appendChild(inicio_p);
  let fin_p = document.createElement('p');
  fin_p.innerHTML = `${jsEnd}`;
  document.getElementById('duracion-js').appendChild(fin_p);
  let duracion_p = document.createElement('p');
  duracion_p.innerHTML = `${duracion}`;
  document.getElementById('duracion-js').appendChild(duracion_p);
  // poner solucion
  let solucion_p = document.createElement('p');
  solucion_p.innerHTML = `${res}`;
  document.getElementById('solucion-js').appendChild(solucion_p);
};