# cypress básico

Projeto de testes com cypress utilizando como referência o curso de [`cypress básico`](https://www.udemy.com/course/testes-automatizados-com-cypress-basico) 

## Pré-requisitos

* node 18.13.0
* npm 8.19.3
* cypress 12.4.0
* faker 7.6.0

## Instalação

Run `npm install`

## Testes

### headless mode

Run `npm test`

### Interactive mode

Run `npm run cy:open`
> Nesse caso será usado o seguinte parametro para viewport `--config viewportWidth=1280 viewportHeight=880`

Run `npm run cy:open:mobile`
> Nesse caso será usado o seguinte parametro para viewport `--config viewportWidth=370 viewportHeight=660`
___
