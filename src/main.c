#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <emscripten/emscripten.h>
#include <time.h>


int compareNumbers(const void* a, const void* b) {
  return (*(int*)b - *(int*)a);
}

void assignJobs(int nClusters, int nJobs, int* jobs) {
  double inicio = clock();

  qsort(jobs, nJobs, sizeof(int*), compareNumbers);


  int elements[nJobs][2];
  for (int i = 0; i < nJobs; i++) {
    elements[i][0] = jobs[i];
    printf("%d\n", elements[i][0]);
  }

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
    elements[i][1] = min_index;
  }

  printf("SOLUCIÓN: \n");
  for (int i = 0; i < nJobs; i++) {
    printf("Tiempo: %d, grupo: %d \n", elements[i][0], elements[i][1]);
  }

  double fin = clock();

  EM_ASM(
      {document.getElementById('duracion-c').innerHTML = $0;
      document.getElementById('loader-duracion-c').style.display = 'none';
      }, (fin - inicio) / CLOCKS_PER_SEC);
}
