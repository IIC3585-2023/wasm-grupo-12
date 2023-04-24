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

const assignMemory = () => {}

Module.onRuntimeInitialized = () => {
  document.getElementById('test').onclick = () => {
    console.log('test pressed');
    const nClusters = parseInt(document.getElementById('clusters').value);
    console.log(`Number of clusters: ${nClusters}`);

    const jobs = Array.from(document.getElementsByName('job')).map(element => parseInt(element.value));
    console.log(`Jobs: ${jobs}`);

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
  };
};