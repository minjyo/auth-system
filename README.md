# auth-system
개인 프로젝트 - 인증 시스템 개발
<br/>
<br/>

## 📚 학습 정리 
https://time-mistake-8e7.notion.site/cc7580dfa8834f1b8d6a82ee386c95df

<br/>

## 📝 목표 
1. Node와 Express를 이용한 REST API 서버 구축을 공부하고 이해한다.
2. User DB를 설계하고 MySQL로 데이터베이스를 관리한다.
3. 암호화의 종류에 대해 공부하고 비밀번호를 암호화한다.
4. 세션, 쿠키, JWT에 대해 공부하고 인증 서버를 구현한다.
<br/>
<br/>

## 진행 과정

### 👩🏻‍💻 1일차 (12.14)
1. Node와 Express 설치 및 실행
2. Express에서 자주 쓰이는 미들웨어 살펴보기 
3. Router 객체로 라우팅 분리하기

### 👩🏻‍💻 2일차 (12.15)
1. MySQL 연결 후, 데이터베이스 & 테이블 생성
2. MySQL CRUD
3. 시퀄라이즈 모델 정의
4. 시퀄라이즈 쿼리, 관계 쿼리 작성
5. Passport 모듈 구현 및 로컬 로그인 개발


### 👩🏻‍💻 3일차 (12.16)
1. 요청과 응답, REST API, 쿠키와 세션, CORS 개념
2. JWT 토큰 발급 및 검사
3. DB 구조 수정
4. Postman으로 Passport & JWT API 테스트


### 👩🏻‍💻 4일차 (12.17)
1. 회원가입 API 개발
2. Passport-local로 로그인 API 개발
3. Passport-jwt로 JWT 인증 구현 후, 로그인 이후의 API에서 JWT 방식 인증 사용 
4. 유저 자기소개 등록 API 개발
5. 프론트엔드 인증 페이지 개발
6. 프론트엔드 인증 기능(sign, login) 개발


### 👩🏻‍💻 5일차 (12.18)
1. 백엔드 API 개발 - 유저 삭제, 관리자 권한, 유저 권한 확인
2. 프론트엔드 페이지 개발 - 메인, 어드민 
3. 프론트엔드 기능 개발 - 로그아웃, 유저 삭제, 관리자 권한, 자기소개 등록

<br/>
<br/>

## 🛠 요구사항
1. 회원가입 - POST /auth/sign
2. 로그인 - POST /auth/login
3. 사용자 정보 가져오기 - GET /user/info
4. 사용자 자기소개 등록하기 - POST /user/intro
5. 관리자 확인 - GET /user/admin
6. 모든 사용자 정보 가져오기 - GET /admin/users
7. 사용자 삭제 - POST /admin/user
8. 관리자 권한 주기 - POST /admin/setAdmin

<br/>
<br/>

## 🛠 아키텍처
<img width="658" alt="architecture" src="https://user-images.githubusercontent.com/24283401/146665917-a98e9f77-afe7-4a37-94c6-3337ac08a7f6.png">

<br/>

## 🛠 DB 구조
<img width="310" alt="DB" src="https://user-images.githubusercontent.com/24283401/146697427-2ea3fb90-1ea2-4ada-924f-7a358cd0a20d.png">

<br/>

## 프로젝트 구조 

### 백엔드
<img width="568" alt="스크린샷 2021-12-20 오전 10 00 03" src="https://user-images.githubusercontent.com/24283401/146697819-5fc12fab-25e8-43b5-9ce1-3e1b31dc5d29.png">

### 프론트엔드
<img width="305" alt="스크린샷 2021-12-20 오전 11 51 11" src="https://user-images.githubusercontent.com/24283401/146704937-0a73c899-7c3c-4009-ab90-623135fa2bdf.png">
