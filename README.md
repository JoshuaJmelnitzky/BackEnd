## Link a HEROKU https://coder-heroku-app.herokuapp.com/

## Ejecución modo cluster 

    Iniciar con:
        - nodemon src/index.js -p 8081 -m "cluster"
        - El puerto por defecto es 8080

![myimage-alt-tag](https://res.cloudinary.com/dk8yfwthp/image/upload/v1660626291/reame/modoCluster_vezo6s.png)

## Ejecución modo fork

    Iniciar con:
        - nodemon src/index.js -p 8081
        - El puerto por defecto es 8080
        - Sin parámetros se inicia en modo fork

![myimage-alt-tag](https://res.cloudinary.com/dk8yfwthp/image/upload/v1660626291/reame/modoFork_bxxbeh.png)

## Ejecución FOREVER listado procesos
    Iniciar con:
        - iniciar con: forever start src/index.js -p 8081 --watch (agregar -m cluster para ejecutar en modo cluster).
        - con forever list muestro los procesos de forever y con tasklist /fi "imagename eq node.exe" muestro los del sistema operativo

![myimage-alt-tag](https://res.cloudinary.com/dk8yfwthp/image/upload/v1660626292/reame/forever_dphrew.png)

### Finalizar procesos FOREVER

        - con taskkill /pid "numProceso"/f mato un proceso por sistema operativo. 
        - con forever stopall detengo los procesos activos

![myimage-alt-tag](https://res.cloudinary.com/dk8yfwthp/image/upload/v1660626291/reame/foreverDetener_i2vqkd.png)

## Ejecución PM2 
    Inicio un servidor en 8081 modo fork:
        pm2 start src/index.js --name="Servidor con fork" --watch -- 8081
    Inicio otro en 8082 modo cluster
        >pm2 start server.js --name="Servidor con cluster" --watch -i max -- 8082

![myimage-alt-tag](https://res.cloudinary.com/dk8yfwthp/image/upload/v1660626292/reame/pm2_t1aypy.png)

### Finalizar procesos PM2 

      - con taskkill /pid "numProceso"/f mato un proceso por sistema operativo. 
      - con pm2 delete all finalizo todos los procesos por pm2.

![myimage-alt-tag](https://res.cloudinary.com/dk8yfwthp/image/upload/v1660626292/reame/pm2Detener_tmbxxf.png)


### NGINX 
  a) Para api/randoms inicio un servidor en modo cluster en puerto 8081 con:
        node src/index-p 8081 -m cluster
     Para el resto otro sin modo (por defecto fork) en puerto 8080 con:
        node server -p 8080 (o sin puerto, porque está por defecto 8080)
     Y corro nginx.exe
  b) Para api/randoms en 4 instancias en 8082, 8083, 8084 y 8085:
        node src/index-p 8082
        node src/index-p-8083
        node src/index-p 8084
        node src/index-p 8085


