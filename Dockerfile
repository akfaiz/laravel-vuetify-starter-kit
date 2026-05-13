# syntax=docker/dockerfile:1.7

FROM php:8.4-fpm-alpine AS php-base

WORKDIR /var/www/html

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apk add --no-cache \
        icu-libs \
        libpq \
        libzip \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        icu-dev \
        libpq-dev \
        libzip-dev \
    && docker-php-ext-install -j"$(nproc)" \
        bcmath \
        intl \
        opcache \
        pdo_pgsql \
        zip \
    && apk del .build-deps

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

FROM php-base AS app-build

COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts

COPY package.json package-lock.json ./
RUN apk add --no-cache --virtual .node-deps nodejs npm \
    && npm ci

COPY . .

RUN export APP_ENV=production APP_DEBUG=false APP_URL=http://localhost APP_KEY=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
    && php artisan package:discover --ansi --no-interaction \
    && php artisan route:clear --no-interaction \
    && php artisan wayfinder:generate --with-form --no-interaction \
    && npm run build \
    && rm -rf node_modules \
    && npm cache clean --force \
    && apk del .node-deps \
    && composer dump-autoload --optimize --classmap-authoritative

FROM php-base AS app

ENV APP_ENV=production \
    APP_DEBUG=false

COPY --from=app-build /var/www/html /var/www/html

RUN mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

USER www-data

EXPOSE 9000

CMD ["php-fpm"]

FROM nginx:1.27-alpine AS nginx

WORKDIR /var/www/html

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=app-build /var/www/html/public /var/www/html/public
