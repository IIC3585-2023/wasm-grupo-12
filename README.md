# wasm-grupo-12

Para probar el proyecto:
1. **Instalar Emscripten SDK:** Seguir las instrucciones de instalación en https://emscripten.org/docs/getting_started/downloads.html
2. **Cambios HTML:** Todos los cambios que se quieran realizar deben ser en el archivo `html_template\shell_minimal.html`. Este archivo se utiliza como base para generar el archivo `main.html, en caso de modificar el segundo todos los cambios se perderan al compilar el proyecto.
3. **Cambios C:** Todos los cambios que se quieran realizar deben ser en el archivo `main.c`.
4. **Compilar proyecto:** Ejecutar el comando `emcc -o main.html main.c --shell-file html_template/shell_minimal.html -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['ccall']"` esto generara los archivos `main.html`, `main.js` y `main.wasm` que son los que se deben utilizar para probar el proyecto.
5. **Servidor:** Para probar el proyecto se debe ejecutar un servidor web, para esto se puede utilizar el comando `python -m SimpleHTTPServer 8000` y luego abrir el navegador en la dirección `http://localhost:8000/main.html`.