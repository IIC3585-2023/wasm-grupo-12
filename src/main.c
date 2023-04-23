#include <stdio.h>
#include <emscripten/emscripten.h>
#include <time.h>

// Main is called automatically when the page loads
int main()
{
    printf("Hello World\n");
    return 0;
}

// EMSCRIPTEN_KEEPALIVE adds functions to the exported functions list
EMSCRIPTEN_KEEPALIVE void myFunction()
{

    printf("MyFunction Called\n");
    // EM_JS is used to declare JavaScript functions from inside a C file.
    EM_ASM(
        const listArray = [... document.getElementsByClassName('input')];
        const nClusters = listArray.shift();
        listArray.forEach((item) => {console.log(item.value)});
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