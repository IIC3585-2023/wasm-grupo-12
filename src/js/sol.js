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
N = 5
M = 2
// obtener tiempos
const times = [30, 50, 10, 20, 90]
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
console.log(elements.map((element => element[0])))

