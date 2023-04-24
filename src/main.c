#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <emscripten/emscripten.h>
#include <time.h>

// Main is called automatically when the page loads
int main(){
    printf("Hello World\n");
    return 0;
}

int compareNumbers(const void* a, const void* b) {
  int* ia = *(int**)a;
  int* ib = *(int**)b;
  return (ia[1] - ib[1]);
}

void assignJobs(int nClusters, int nJobs, int* jobs, int** elements) {
  printf("1\n");
  // Input the time of each element and store it in the array
  for (int i = 0; i < nJobs; i++) {
    elements[i][0] = jobs[i];
    elements[i][1] = i; // Store the index of the element
    printf("%d, %d \n", elements[i][0], elements[i][1]);
  }
  

  // Sort the array of elements in non-decreasing order of time
  qsort(elements, nJobs, sizeof(int*), compareNumbers);

  // Assign each element to the group with the smallest sum
  int sum[nClusters];
  for (int i = 0; i < nClusters; i++){
    sum[i] = 0;
  }

  for (int i = 0; i < nJobs; i++) {
    int min_sum = sum[0];
    int min_index = 0;
    for (int j = 1; j < nClusters; j++) {
      if (sum[j] < min_sum) {
        min_sum = sum[j];
        min_index = j;
      }
    }
    sum[min_index] += elements[i][0];
    elements[i][0] = min_index; // Store the group of the element
  }

  printf("2\n");
  for (int i = 0; i < nJobs; i++) {
    printf("%d, %d \n", elements[i][0], elements[i][1]);
  }

  // Free the memory
  // for (int i = 0; i < nJobs; i++) {
  //   free(elements[i]);
  // }
  // free(elements);
}






// EMSCRIPTEN_KEEPALIVE adds functions to the exported functions list
EMSCRIPTEN_KEEPALIVE void myFunction()
{

    printf("MyFunction Called\n");
    // EM_JS is used to declare JavaScript functions from inside a C file.
    EM_ASM(

        document.getElementById('inicio-c').innerHTML = new Date().toLocaleTimeString();
        document.getElementById('loader-inicio-c').style.display = 'none';);

    double inicio = clock();
    /*// Solucion al problema en c

    

     // */
    double fin = clock();

    // EM_JS is used to declare JavaScript functions from inside a C file.
    // Can also send values from C into JavaScript inside EM_ASM
    EM_ASM(
        {document.getElementById('loader-fin-c').style.display = 'none';
        document.getElementById('fin-c').innerHTML = new Date().toLocaleTimeString(); 
        document.getElementById('loader-duracion-c').style.display = 'none';
        document.getElementById('duracion-c').innerHTML = $0; 
        }, (fin - inicio) / CLOCKS_PER_SEC);

}