## Custom élément 

La progress-bar est un custom élément . Elle répond à plusieurs attributs qui sont :

    -progress-width pour la taille total de la barre
    -progress-height pour sa largeur
    -progress-color pour la couleur de la progression
    -progress-value pour la valeur de progression (exprimée en %)
    -progress-background pour la couleur du fond de la barre

On peut changer la valeur des attributs avec setAttribute et aussi de façon "direct" :

ex: element.value = 50 ou element.width = 300

Pour element.value, la valeur doit être comprise entre 0 et 100 ou une erreur sera levée.
Le custom peut émettre un mouseEvent lors d'un click sur lui. (eventName = progress-click)