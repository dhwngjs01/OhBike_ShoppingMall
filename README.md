# 🏍 Oh! 바이크

Express.js 기반의 바이크 용품 쇼핑몰

## 📖 프로젝트 소개

<a href="https://bike-auction.co.kr/main/index.php" title="바이크옥션으로 이동하기" target="_blank">바이크옥션</a>, <a href="https://www.fc-moto.de/" title="FC MOTO로 이동하기" target="_blank">FC MOTO</a>를 참고하여 만든 바이크 용품 쇼핑몰 입니다.

## ⏰ 개발 기간

- 19.11.06일 - 19.12.18일

## ⚙ 개발 환경

- **JavaScript Runtime** : `Node.js 19.8.1`
- **Template Engine** : `Pug 3.0.2`
- **Server** : `Express.js 4.17.1`
- **Text Editor** : `Visual Studio Code 1.79.2`
- **Database** : `MariaDB 10.11`

## 📋 시스템 구성도

|                                                             사용자 구성도                                                             |                                                             관리자 구성도                                                             |
| :-----------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
| <img alt='사용자 구성도' src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/e0baf436-df4b-4a94-b672-714f994ca4fb"> | <img alt='관리자 구성도' src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/cde911a5-0ec7-4985-a733-5d5cb68c99be"> |

## ⌨ E-R 다이어그램

<p align="center">
  <img alt="E-R 다이어그램" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/836b290a-9cd1-4b70-8c9e-998713cd121d" width="80%">
</p>

## 🔍 기능 설명

#### 메인 페이지

- 슬라이드 애니메이션 (`Slick`)

#### 로그인

- 로그인 시 쿠키(Cookie) 및 세션(Session) 생성

#### 회원가입

- 아이디 중복 검증
- 필수 입력 항목 검증
- 휴대폰 번호 양식 검증
- Daum 우편번호 서비스 연동

#### 상품 목록

- 상품 검색
- 상품 카테고리별 목록 조회

#### 상품 상세

- 상품 옵션 선택
- 상품 수량 선택
- 바로구매 또는 장바구니 담기

#### 주문

- 배송지 입력
- 결제

#### 장바구니

- 선택 주문 & 삭제
- 전체 주문 & 삭제

#### 마이페이지

- 주문 조회
- 회원 정보 수정
- 회원 탈퇴

#### 관리자페이지

- 대시보드
- 회원 목록 (전체 회원 조회)
- 상품 관리 (상품 추가, 수정, 삭제, 비활성화, `CKEditor`)
- 주문 관리 (주문 조회, 배송 상태 변경)

## 🖥 스크린샷

### 메인페이지

<img alt="메인페이지" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/475aa3a4-6d9b-4d96-8880-b1e33902bcd0">

<hr>

### 상품 목록

<img alt="상품 목록" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/765d8734-cfb8-41dd-8c45-f3ee5e8d7a08">

<hr>

### 상품 목록 - 카테고리 검색

<img alt="상품 목록 - 카테고리 검색" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/7f118d2e-2076-4cca-8497-48da1c614215">

<hr>

### 상품 목록 - 키워드 검색

<img alt="상품 목록 - 키워드 검색" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/49ba532c-402b-4b2a-a584-491241b487d6">

<hr>

### 상품 상세

<img alt="상품 상세" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/6250410e-836a-4d71-8e6f-71e6e6a5498c">

<hr>

### 상품 주문

<img alt="상품 주문" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/2f725240-bf89-407a-bb61-a33d3a1108dd">

<hr>

### 주문 내역

<img alt="주문 내역" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/774df0e0-b5f5-44d3-9ba7-97c3d18590bc">

<hr>

### 장바구니

<img alt="장바구니" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/3741a583-e627-48f7-a514-428434628152">

<hr>

### 장바구니 주문

<img alt="장바구니 주문" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/4b73833f-a41c-496b-b0dd-cc022b5e908b">

<hr>

### 마이페이지

<img alt="마이페이지" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/45ec535f-4deb-4c76-b27f-7485700a6747">

<hr>

### 마이페이지 - 회원 정보 수정

<img alt="마이페이지 - 회원 정보 수정" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/b9d9e4b8-cfe5-452f-b733-a6b2a55c1a80">

<hr>

### 마이페이지 - 회원 탈퇴

<img alt="마이페이지 - 회원 탈퇴" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/4a119105-8c1a-437d-8a0e-e9efa8dd47f1">

<hr>

### 관리자페이지 - 대시보드

<img alt="관리자페이지 - 대시보드" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/9b8442ed-4467-4c60-90a9-a14abc301d55">

<hr>

### 관리자페이지 - 회원 목록

<img alt="관리자페이지 - 회원 목록" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/c739167d-943d-4d1c-9d5c-f7a8fe79a771">

<hr>

### 관리자페이지 - 상품 관리

<img alt="관리자페이지 - 상품 관리" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/7197c677-8cfe-4d30-82a3-2a42ac5e0928">

<hr>

### 관리자페이지 - 상품 관리 - 상품 등록

<img alt="관리자페이지 - 상품 관리 - 상품 등록" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/98fe2f89-3c2e-4ad5-bc32-5bde5fd5d15a">

<hr>

### 관리자페이지 - 주문 관리

<img alt="관리자페이지 - 주문 관리" src="https://github.com/dhwngjs01/OhBike_ShoppingMall/assets/38345593/1f683b49-0b75-4daf-9448-ea307136e79f">
