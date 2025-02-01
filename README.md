# API Code Executor

## Description

Cette API permet d'exécuter du code source en plusieurs langages de programmation. Elle prend en entrée un code source et renvoie le résultat de son exécution. Les langages supportés sont JavaScript (js), Python (py), C (c) et C++ (cpp).

## Fonctionnalités

- Exécution de code source en temps réel.
- Support des langages : JavaScript, Python, C, C++.
- Réponse formatée avec le résultat de l'exécution.


## Utilisation

### Endpoint
  **BASE**:""
- **URL** : `/api/code/input`
- **Méthode** : POST
- **Content-Type** : application/json

### Paramètres d'entrée

Le corps de la requête doit être un objet JSON contenant les champs suivants :

- `input` : (string) Le code source à exécuter.
- `lang` : (string) Le langage du code source. Peut prendre les valeurs suivantes :
- `js` pour JavaScript
- `py` pour Python
- `c` pour C
- `cpp` pour C++

### Output

`{ output: errorMessage | codeResult }`