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

Module.onRuntimeInitialized = () => {
  document.getElementById('test').onclick = () => {
    const nClusters = parseInt(document.getElementById('clusters').value);

    const jobs = Array.from(document.getElementsByName('job')).map(element => parseInt(element.value));

    /* C implementation */

    document.getElementById('inicio-c').innerHTML = new Date().toLocaleTimeString();
    document.getElementById('loader-inicio-c').style.display = 'none';

    const jobsPtr = Module._malloc(jobs.byteLength);
    Module.HEAPU32.set(jobs, jobsPtr >> 2)

    // Allocate memory for the array of elements
    const elements = Module._malloc(jobs.length * 4);
    for (let i = 0; i < jobs.length; i++) {
      elements[i] = Module._malloc(2 * 4);
    }

    Module.ccall('assignJobs', null, 
                ['number', 'number', 'number', 'number'], 
                [nClusters, jobs.length, jobsPtr, elements]);

    
    const elementsArray = new Int32Array(Module.HEAPU32.buffer, elements, jobs.length);

    console.log(`elementsArray: ${elementsArray}`);

    document.getElementById('fin-c').innerHTML = new Date().toLocaleTimeString(); 
    document.getElementById('loader-fin-c').style.display = 'none';

    Module._free(jobsPtr);

    /* JS implementation */
    let jsStart = new Date();
    const res = jsSolution(nClusters, jobs.length, jobs)
    let jsEnd = new Date();
    let duracion = (jsEnd - jsStart)/1000;
    console.log("Total time taken : " + duracion);

    // poner tiempos en vista
    document.getElementById('loader-inicio-js').style.display = 'none';
    let inicio_p = document.createElement('p');
    inicio_p.innerHTML = `${jsStart.toLocaleTimeString()}`;
    document.getElementById('inicio-js').appendChild(inicio_p);

    document.getElementById('loader-fin-js').style.display = 'none';
    let fin_p = document.createElement('p');
    fin_p.innerHTML = `${jsEnd.toLocaleTimeString() }`;
    document.getElementById('fin-js').appendChild(fin_p);

    document.getElementById('loader-duracion-js').style.display = 'none';
    let duracion_p = document.createElement('p');
    duracion_p.innerHTML = `${duracion} s`;
    document.getElementById('duracion-js').appendChild(duracion_p);

    // poner solucion
    document.getElementById('loader-solucion-js').style.display = 'none';
    let solucion_p = document.createElement('p');
    solucion_p.innerHTML = `[T_i, ...] = [${res}]`;
    console.log('solucion', res);
    document.getElementById('solucion-js').appendChild(solucion_p);
  };
};
