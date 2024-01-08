# Utilisez l'image PHP 8.2 avec Apache
FROM php:8.2-apache

# Installez les dépendances nécessaires (curl, git)
RUN apt-get update && \
    apt-get install -y curl git

# Installez Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copiez les fichiers de l'application dans le conteneur
COPY . /var/www/html/

# Installez Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/

# Exposez le port 80 pour Apache
EXPOSE 80

# Point d'entrée pour démarrer Apache
CMD ["apache2-foreground"]
