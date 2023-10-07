# Sebo Online S.A 📚
API para o Sebo Online S.A., que permite o cadastro de usuários, livros e transações.

## Objetivo 🎯
Desenvolver uma API robusta e eficiente para o Sebo Online S.A., que permita o cadastro de usuários (compradores e vendedores), livros e transações. A plataforma precisa ser intuitiva e fácil de usar, garantindo que os amantes de livros possam navegar, comprar e vender sem complicações.
A apresentação de seu texto (formatação, aparência, qualidade, etc), será avaliada, em paralelo ao conteúdo. Utilize figuras se julgar necessário. Os testes serão feitos via Postman.

## Ferramentas 🧰
Node.js, Express, MongoDB (Mongoose), Postman e gerenciamento tokens por JWT.

## Desenvolvimento 👨‍💻
Foram criadas rotas públicas e privadas, para validação da presença de autorização do token, que vai impedir quem não possui token, de acessar recursos privados, porém pode acessar endpoints públicos.
Foram inseridos usuários no banco de dados MongoDB, com auxílio da ODM Mongoose.
A API foi feita com base no Node.js, utilizando o framework Express.
As senhas dos usuários foram criptografadas com bcrypt, e foram realizadas validações dos dados enviados para API pelas requisições.
