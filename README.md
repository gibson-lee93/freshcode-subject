# Freshcode-subject

원티드x위코드 백엔드 프리온보딩 2번째 과제입니다.

Heroku를 이용해 배포를 진행했으며, 사이트의 주소는 [https://pocky-freshcode-subject.herokuapp.com/](https://pocky-freshcode-subject.herokuapp.com/)입니다.

## 과제의 내용

두 개의 과제 중에서 [프레시코드](https://www.freshcode.me/)에서 제공해주신 과제를 선택했습니다.

### 요구 사항

#### [필수 요구 사항]

- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현
  - Swagger 대신 Postman 이용시 API 목록을 Export하여 함께 제출해 주세요
- README 작성
  - 프로젝트 빌드, 자세한 실행 방법 명시
  - 구현 방법과 이유에 대한 간략한 설명
  - 완료된 시스템이 배포된 서버의 주소
  - Swagger를 통한 API 테스트할때 필요한 상세 방법
  - 해당 과제를 진행하면서 회고 내용 블로그 포스팅

#### 개발의 요구 사항

- Database 는 RDBMS를 이용합니다.
- 로그인 기능
  - JWT 인증 방식을 구현합니다.

#### 평가 요소

- 주어진 요구사항에 대한 설계/구현 능력
- 코드로 동료를 배려할 수 있는 구성 능력 (코드, 주석, README 등)
- 유닛 테스트 구현 능력

### 필요한 기능

#### 로그인 기능

1. 로그인 기능

사용자 인증을 통해 상품을 관리할 수 있어야 합니다.

- JWT 인증 방식을 이용합니다.
- 서비스 실행시 데이터베이스 또는 In Memory 상에 유저를 미리 등록해주세요.
- Request시 Header에 Authorization 키를 체크합니다.
- Authorization 키의 값이 없거나 인증 실패시 적절한 Error Handling을 해주세요.
- 상품 추가/수정/삭제는 admin 권한을 가진 사용자만 이용할 수 있습니다.
- 사용자 인증 / 인가

```json
사전 등록된 사용자는 총 2명입니다.

- 사용자 1번
	EMAIL: user@freshcode.me
	PASSWORD: user
  ROLE : [user]

- 사용자 2번
	EMAIL: admin@freshcode.me
	PASSWORD: admin
  ROLE : [admin]
```

2. 상품 관리 기능

아래 상품 JSON 구조를 이용하여 데이터베이스 및 API를 개발해주세요.

- 서비스 실행시 데이터베이스 또는 In Memory 상에 상품 최소한 5개를 미리 생성해주세요.
- 상품 조회는 하나 또는 전체목록을 조회할 수 있으며, 전체목록은 페이징 기능이 있습니다.
  - 한 페이지 당 아이템 수는 5개 입니다.
- 사용자는 상품 조회만 가능합니다.
- 관리자는 상품 추가/수정/삭제를 할 수 있습니다.
- 상품 관리 API 개발시 적절한 Error Handling을 해주세요.

```json
// JSON DATA Structure
{
  "menus": [
    {
      "id": 245,
      "category": "SALAD",
      "name": "깔라마리 달래 샐러드",
      "description": "해산물 샐러드",
      "isSold": false,
      "badge": "NEW",
      "items": [
        {
          "id": 1,
          "menuId": 245,
          "name": "미디움",
          "size": "M",
          "price": 8000,
          "isSold": false
        },
        {
          "id": 2,
          "menuId": 245,
          "name": "라지",
          "size": "L",
          "price": 10000,
          "isSold": false
        }
      ],
      "tags": [
        {
          "id": 1,
          "menuId": 245,
          "type": "vegetarianism",
          "name": "페스코베지테리언"
        }
      ]
    }
  ]
}
```

## 조원

| 이름   | github                                          | 담당 기능                                             |
| ------ | ----------------------------------------------- | ----------------------------------------------------- |
| 이현준 | [lhj0621](https://github.com/lhj0621)           | 상품(menu) 조회(pagination), 생성, 수정, 삭제, 배포   |
| 김태련 | [nojamcode](https://github.com/nojamcode)       | 항목(item) 생성, 수정, 삭제, 유닛테스트               |
| 신영학 | [yhshin0](https://github.com/yhshin0)           | 유저 생성, 로그인, 로그인 인증, 로그아웃, 유닛 테스트 |
| 임유라 | [jiwon5304](https://github.com/jiwon5304)       | 태그 조회, 생성, 수정, 삭제                           |
| 이기범 | [gibson-lee93](https://github.com/gibson-lee93) | 카테고리 검색, 상품(menu) 생성 및 조회                |
| 정진산 | [chinsanchung](https://github.com/chinsanchung) | 유저 생성, 로그인, 로그인 인증, 로그아웃, 유닛 테스트 |

## 개발 환경

- 언어: TypeScript
- 프레임워크: NestJs
- 데이터베이스: SQLite3
- 라이브러리: typeorm, passport, passport-local, passport-jwt, bcrypt, class-validator

## ERD

![프레시코드 데이터베이스 ERD](https://user-images.githubusercontent.com/33484830/140525485-889dcef7-e006-458c-b56e-0fb605f29d27.PNG)

## API 문서

API를 테스트를 위한 방법을 [POSTMAN document](https://documenter.getpostman.com/view/15323948/UVC2HpCf)에서 확인하실 수 있습니다.

## 구현 기능

### 회원가입

- bcrypt의 단방향 암호화로 비밀번호를 암호화하여 저장했습니다.
- class-validator으로 입력 값의 유효성을 검사해 회원가입에서 발생가능한 오류를 줄였습니다.
- 이메일 중복 체크를 통해 동일한 이메일으로 가입을 하지 않도록 했습니다.
- 유저에 권한을 두어 API 이용에 제한을 두었습니다.

### 로그인, 로그인 인증 및 로그아웃

- passport 으로 로그인 과정에서 보안을 유지하고, passport-local의 전략으로 로그인을 수행합니다.
- 로그인 성공 시 jsonwebtoken을 발급합니다. 이 토큰은 로그인이 필요한 기능을 수행하기에 앞서 활용됩니다.
- 로그인 시간을 유저의 DB에 기록하는 동시에 토큰에 저장하며, 이는 API 호출 시 두 시각의 값을 비교하여 토큰의 유효성을 검증합니다.
- 유저 DB 의 로그인 시간을 null 값으로 갱신하여 로그아웃을 수행합니다. 그 결과 로그인 당시에 발급받은 토큰을 만료시킵니다.

### 상품(menu)

- 상품의 생성, 수정 및 삭제를 작업했습니다. API를 수행하기 전에 로그인을 했는지, 그리고 role이 admin 인지를 확인합니다.
- 상품의 목록을 페이지네이션으로 출력하며, 상세 보기에서는 해당 메뉴에 대한 정보 및 카테고리, 항목, 태그를 보여줍니다.

### 카테고리

- 카테고리의 생성, 수정, 삭제를 작업했습니다.
- 카테고리의 목록, 그리고 아이디나 이름으로 특정 카테고리를 조회하는 기능을 작업했습니다.

### 항목(item)

- 항목(item)의 생성, 수정, 삭제 기능을 작업했습니다. API를 수행하기 전에 로그인을 했는지, 그리고 role이 admin 인지를 확인합니다.
- 항목(item)을 등록, 수정하기 전에 메뉴가 있는지를 검증합니다. 삭제는 메뉴의 유무에 상관없이 가능하도록 했습니다.

### 태그

## 설치 및 실행 방법

### 공통

- 1. 최상위 폴더에 `.env` 파일에 `JWT_SECRET`에 임의의 문자열을 작성해 저장합니다.
- 2. `npm install`으로 패키지를 설치합니다.
- 3. 테스트
  - 개발일 경우: `npm run start`으로 `localhost:3000`에서 테스트하실 수 있습니다.
  - 배포일 경우: `npm run build`으로 애플리케이션을 빌드합니다. 그리고 `npm run start:prod`으로 실행합니다.
- 4. POST `localhost:3000/users`에서 `email`, `password`, `role`("admin" 또는 "user")를 입력해 유저를 생성합니다.
- 5. POST `localhost:3000/auth/login`에 `email`, `password`을 입력하신 후 결과값으로 access_token을 발급받습니다.
- 6. 상품 생성 등 권한이 필요한 API의 주소를 입력한 후, Headers 의 Authorization에 access_token을 붙여넣어 권한을 얻은 후 API를 호출합니다.

## 폴더 구조

```bash
.
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth
│   │   ├── auth-guard
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── local-auth.guard.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── dto
│   │   │   └── login-user.dto.ts
│   │   ├── get-user.decorator.ts
│   │   └── strategies
│   │       ├── jwt.strategy.ts
│   │       └── local.strategy.ts
│   ├── categories
│   │   ├── categories.controller.ts
│   │   ├── categories.module.ts
│   │   ├── categories.repository.ts
│   │   ├── categories.service.ts
│   │   ├── dto
│   │   │   └── create-update-category.dto.ts
│   │   └── entities
│   │       └── category.entity.ts
│   ├── core
│   │   └── entities
│   │       └── core.entity.ts
│   ├── items
│   │   ├── dto
│   │   │   ├── create-item.dto.ts
│   │   │   └── update-item.dto.ts
│   │   ├── entities
│   │   │   └── item.entity.ts
│   │   ├── items.controller.ts
│   │   ├── items.module.ts
│   │   ├── items.repository.ts
│   │   └── items.service.ts
│   ├── main.ts
│   ├── menus
│   │   ├── dto
│   │   │   ├── create-menu.dto.ts
│   │   │   └── update-menu.dto.ts
│   │   ├── entities
│   │   │   └── menu.entity.ts
│   │   ├── menus.controller.ts
│   │   ├── menus.module.ts
│   │   ├── menus.repository.ts
│   │   └── menus.service.ts
│   ├── tags
│   │   ├── entities
│   │   │   └── tag.entity.ts
│   │   ├── tags.controller.ts
│   │   ├── tags.module.ts
│   │   ├── tags.repository.ts
│   │   └── tags.service.ts
│   └── users
│       ├── dto
│       │   └── create-user.dto.ts
│       ├── entities
│       │   └── user.entity.ts
│       ├── users.controller.spec.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       ├── users.service.spec.ts
│       └── users.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

## 개인 블로그 목록

- [이현준] (https://supiz.tistory.com/)
- [김태련] (https://velog.io/@code-link)
- [신영학] (https://nbkw.tistory.com/)
- [임유라] (https://banglecoding.github.io/)
- [이기범] (https://mysterious-laborer-518.notion.site/Gibson-s-Notion-2dd7f598fba64f1c9806cded5b4b83a0)
- [정진산] (https://chinsanchung.github.io/)
