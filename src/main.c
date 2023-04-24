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
  double inicio = clock();
  printf("1\n");
  // Input the time of each element and store it in the array
  for (int i = 0; i < nJobs; i++) {
    elements[i][0] = jobs[i];
    elements[i][1] = i; // Store the index of the element
    printf("%d, %d \n", elements[i][0], elements[i][1]);
  }
  

  // Sort the array of elements in non-decreasing order of time
  printf("%p\n", elements);
  qsort(elements, nJobs, sizeof(int*), compareNumbers);
  printf("%p\n", elements);

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
  double fin = clock();

  EM_ASM(
        {document.getElementById('duracion-c').innerHTML = $0;
        document.getElementById('loader-duracion-c').style.display = 'none';
        }, (fin - inicio) / CLOCKS_PER_SEC);
}