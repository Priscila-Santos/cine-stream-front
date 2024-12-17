# CineStream 

CineStream é um projeto que utiliza dados da API TMDb para fornecer informações detalhadas sobre filmes e séries. Esta fase do projeto substitui o uso de arquivos CSV do módulo passado por um banco de dados real H2, proporcionando uma experiência mais robusta e escalável. O front-end foi desenvolvido em Angular para se integrar ao back-end feito com Spring Boot Java Maven.
[Link do Back-End do projeto](https://github.com/Priscila-Santos/Cine-Stream-Test) (incluindo testes automatizados)

## Descrição do Projeto 
O CineStream permite ao usuário:

Buscar filmes e séries por nome

Filtrar filmes e séries por ano de lançamento

Sugerir filmes e séries por gênero

Exibir a melhor avaliação de filmes e séries

Visualizar informações detalhadas sobre filmes e séries

## Front-end com Angular 
### 1. Criação do Projeto Angular
Para a criação de um projeto Angular é necessário instalar o Angular CLI:

```plaintext
npm install -g @angular/cli
```
### 2. Criar um novo projeto Angular

```plaintext
ng new cineStream
cd cineStream
```
### 3. Criação de Componentes
Criar componentes usando o Angular CLI:

```plaintext
ng generate component menu-bar
ng generate component big-card
```

### 4. Criação de Serviços
Criar serviços para manipular os dados vindos do back-end:

```plaintext
ng generate service movie
```

### 5. Comunicação com o Back-end
No serviço criado (data.service.ts), utilize o HttpClientModule para fazer requisições HTTP ao back-end:

```java
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/'; // URL do back-end

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl);
  }

  getMovieById(id: number): Observable<Data> {
    return this.http.get<Data>(`${this.apiUrl}/${id}`);
  }
}
```
## Integração com o Back-end em Spring Boot 🍃
### 1. Configuração do Projeto Spring Boot
Configurar o Spring Boot corretamente com as dependências no  pom.xml:

```java
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
    <!-- Outras dependências necessárias -->
</dependencies>
```
### 2. Configuração do Banco de Dados H2
Configurar o banco de dados H2 no arquivo application.properties:

```java
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.h2.console.enabled=true
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```
### 3. Integração com a API TMDb
Utilização da API do TMDb para buscar informações sobre filmes e séries. Primeiro, registre-se no site TMDb e obtenha uma chave de API. Configure o acesso à API no application.properties:

```java
tmdb.api.key=SUA_CHAVE_API
```
### 4. Configuração do CORS
Configuração do CORS no back-end para permitir a comunicação com o Angular:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
```
## Execução do Projeto 
### 1. Inicializar o Back-end
Executar o projeto Spring Boot:

```java
mvn spring-boot:run
```
### 2. . Inicializar o Front-end
Executar o projeto Angular:
```java
ng serve
```
A aplicação Angular estará disponível em http://localhost:4200, comunicando-se com o back-end em http://localhost:8080.

## Desafios Enfrentados 
1. **Integração com API Externa**: Realizar requisições à API do TMDb e tratar os dados recebidos.

2. **Configuração do Banco de Dados H2**: Garantir a persistência de dados durante a execução do projeto.

3. **Gerenciamento de Exceções**: Tratamento adequado de exceções para entradas inválidas e dados mal formatados.

4. **Integração do back-end e front-end**: Integrar codigos feitos em dois frameworks distintos uma para  o back-end (Spring Boot) e outro para o front-end (Angular) de maneira adequada e eficiente.

## Conceitos Utilizados 📚
### Front-end com Angular 📱
**Componentes** Componentes são a unidade básica de construção de uma aplicação Angular. Eles controlam uma parte específica da interface do usuário e incluem um template HTML, lógica em TypeScript e estilos CSS. Por exemplo, no CineStream, temos componentes como moenu-bar e big-card.

**Serviços e Injeção de Dependência** Serviços são utilizados para compartilhar dados ou lógica entre diferentes partes da aplicação. No Angular, os serviços são injetados em componentes usando o padrão de injeção de dependência. Por exemplo, data.service.ts é um serviço que faz requisições HTTP ao back-end para obter dados sobre filmes.

**Roteamento** O roteamento permite a navegação entre diferentes vistas ou componentes da aplicação sem recarregar a página. Utilizando o módulo de roteamento do Angular, podemos definir rotas para diferentes componentes, como /series para a lista de serie e /series/:id para os detalhes de uma serie específica.

**Pipes** Pipes são usados para transformar dados em templates. Por exemplo, podemos utilizar um pipe para formatar a data de lançamento de um filme ou para transformar texto em maiúsculas.

**Observables** Angular utiliza a biblioteca RxJS para trabalhar com operações assíncronas através de Observables. Serviços como o HttpClient retornam Observables, permitindo que os componentes se inscrevam (subscribe) para receber os dados quando estiverem disponíveis.

## Back-end com Spring Boot 🍃
**Controle Restful** O Spring Boot facilita a criação de APIs RESTful com controladores anotados com @RestController. Cada controlador define os endpoints da aplicação, mapeando as requisições HTTP para métodos de tratamento específicos. Por exemplo, FilmeController define endpoints para listar todos os filmes ou buscar um filme por ID.

**JPA e Repositórios** Spring Data JPA simplifica a persistência de dados usando a Java Persistence API (JPA). Repositórios são interfaces que permitem operações CRUD (Create, Read, Update, Delete) em entidades de banco de dados. No CineStream, temos um repositório para a entidade `Movie`.

**Injeção de Dependência** Similar ao Angular, o Spring Boot utiliza a injeção de dependência para gerenciar objetos e suas dependências. Por exemplo, o serviço `FilmeService` é injetado no controlador `FilmeController` para fornecer a lógica de negócio.

**Spring Boot Starter** Spring Boot Starters são dependências pré-configuradas que facilitam a configuração do projeto. Por exemplo, `spring-boot-starter-web` inclui tudo o que é necessário para construir um aplicativo web, enquanto `spring-boot-starter-data-jpa` inclui dependências para trabalhar com JPA.

**Configuração e Profiles** O Spring Boot permite configurar a aplicação usando arquivos `application.properties` ou `application.yml`. Perfis (Profiles) permitem que diferentes configurações sejam aplicadas para diferentes ambientes, como desenvolvimento, teste e produção. No CineStream, configuramos o banco de dados H2 e a chave da API do TMDb no arquivo de propriedades.

## Integração entre Angular e Spring Boot
**Comunicação via HTTP** O front-end Angular se comunica com o back-end Spring Boot através de requisições HTTP. Utilizamos o serviço `HttpClient` do Angular para fazer essas requisições, enquanto o Spring Boot expõe endpoints RESTful que processam essas requisições e retornam dados em formato JSON.

**CORS (Cross-Origin Resource Sharing)** Para permitir que a aplicação Angular faça requisições ao back-end Spring Boot que está em um domínio diferente, configuramos o CORS no back-end. Isso é feito utilizando a anotação @CrossOrigin nos controladores ou configurando o CORS globalmente.

**Consumo de APIs Externas** O back-end Spring Boot faz requisições à API do TMDb para obter dados sobre filmes e séries. Esses dados são então persistidos no banco de dados H2 e expostos para o front-end Angular através dos endpoints RESTful.

## Estrutura do Projeto 📂
`database`: Classes responsáveis pela leitura e manipulação de dados.

`model`: Classes de modelo para Filmes e Séries.

`service`: Lógica de negócio para manipulação de filmes e séries.


## Conclusão 
O CineStream demonstra como integrar um front-end Angular com um back-end em Spring Boot, utilizando um banco de dados real H2 e obtendo dados de uma API externa como a TMDb. Esperamos que o CineStream seja útil e inspire outros desenvolvedores a explorar e utilizar essas técnicas em seus próprios projetos. Se tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato!

## Realizadores do Projeto 💡
Priscila Santos

Lucas Alecsander

Luiz Otavio

Matheus Toscano

## Referências
[TMDb Data Base](https://developer.themoviedb.org/docs/getting-started)
 







