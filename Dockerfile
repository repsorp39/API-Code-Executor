FROM ubuntu:24.04

WORKDIR /

RUN apt-get update && apt-get install -y  dumb-init python3 build-essential nodejs && mkdir /codesource 

ENV filename="."
ENV compiler="python"
ENV base="codesource"

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Définition de notre commande par défaut
CMD ["/bin/bash", "-c", "if [ \"$compiler\" = \"c\" ]; then gcc /$base/$filename -o ./\"$filename.out\" && ./\"$filename.out\" && rm ./\"$filename.out\"  ;elif [ \"$compiler\" = \"cpp\" ] ;then g++ /$base/$filename -o ./\"$filename.out\"  && ./\"$filename.out\" && rm ./\"$filename.out\"; elif  [ \"$compiler\" = \"python\" ]; then python3 /$base/$filename;  elif  [ \"$compiler\" = \"node\" ]; then node /$base/$filename;    fi;"]
