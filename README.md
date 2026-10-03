# Modern Web – Projeto Final de E-commerce

Projeto desenvolvido como atividade final da disciplina **Modern Web**, do curso de **Análise e Desenvolvimento de Sistemas**.

O objetivo da atividade é aplicar os conhecimentos desenvolvidos ao longo da disciplina utilizando **HTML, CSS e JavaScript**, incluindo consumo de uma **API pública com `fetch()`**, responsividade, acessibilidade e princípios de **Clean Code**.

## 🛒 TechStore

A **TechStore** é um e-commerce demonstrativo no qual os produtos são carregados dinamicamente por meio de uma API pública.

O projeto representa a evolução das atividades desenvolvidas durante a disciplina, incorporando novos recursos e melhorando a organização do código.

## 🚀 Funcionalidades

- Carregamento dinâmico de produtos através de API pública
- Consumo da API utilizando `fetch()`
- Pesquisa de produtos
- Filtro por categoria
- Carrinho de compras
- Contador de produtos adicionados
- Cálculo do valor total do carrinho
- Persistência do carrinho utilizando `localStorage`
- Alternância entre modo claro e modo escuro
- Persistência da preferência de tema
- Data e hora atualizadas em tempo real
- Layout responsivo para diferentes tamanhos de tela
- Recursos básicos de acessibilidade

## 🌐 API utilizada

O catálogo de produtos é obtido através da API pública **DummyJSON Products API**.

Endpoint utilizado:

`https://dummyjson.com/products?limit=30`

Os dados são obtidos em tempo real pelo JavaScript utilizando `fetch()` e utilizados para gerar dinamicamente os produtos apresentados na página.

## 🧰 Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- Web Storage API (`localStorage`)
- DummyJSON API

## 🧹 Clean Code

Durante o desenvolvimento foram aplicados princípios de **Clean Code**, incluindo:

- nomes claros e significativos para variáveis e funções;
- separação de responsabilidades;
- funções menores e específicas;
- organização e indentação consistente;
- redução de repetições;
- comentários curtos e úteis;
- separação entre estrutura, apresentação e comportamento.

O projeto mantém HTML, CSS e JavaScript em arquivos separados para facilitar a leitura, manutenção e evolução do código.

Como possibilidade de evolução futura, o JavaScript poderá ser dividido em módulos específicos para produtos, carrinho, tema e funções utilitárias.

## ♿ Acessibilidade e responsividade

A interface utiliza elementos semânticos do HTML5, textos alternativos para imagens, atributos ARIA em elementos interativos, estados de foco visíveis e contraste adequado.

O layout foi desenvolvido de forma responsiva, adaptando a grade de produtos e os demais elementos da interface para computadores, tablets e smartphones.

## 📁 Estrutura do projeto

```text
atividade-final-modern-web/
├── index.html
├── style.css
├── script.js
└── LEIA-ME.txt
