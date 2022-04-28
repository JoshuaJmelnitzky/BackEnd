### Preferencia de motor de plantilla

El motor que mejor me resultó fue `Handlebars` ya que si bien requiere de más configuraciones iniciales para poder comenzar a utilizarlo, una vez realizado considero que es más sencillo  .

`EJS` y `PUG` tienen configuraciones sencillas, pero la sintaxis para hacer un ciclo repetitivo y llamar variables es más lento de escribir  .

``` sh 
<%= variableEJS %> 
comparado a 
{{ variableHandlebars }}
```

``` sh 
<% data.forEach( (pr) => { %>  BLOQUE REPETITIVO EJS  <% }) %>  > 
comparado a   
{{#each data}} BLOQUE REPETITIVO HANDLEBARS {{/each}}
```