# 🚆 지하철 정보 서비스 : 열차타요
<div align="center">
  <img src="https://github.com/joooo24/react-metro/assets/58600024/bc1446c2-6a28-46fd-8621-b20cae7c5c3c">
</div>

<br>

- 배포 URL : https://yeol-cha-ta-yo.netlify.app
- Admin Passkey : 1234 

<br>

## 프로젝트 소개

- **열차타요**는 지하철을 이용하는 사람들에게 역정보, 이동소요시간을 제공하는 웹사이트입니다.

<br>

## 팀원 구성

<div align="center">

| **장재훈** | **주현정** | **김수민** | **김수향** | **이상훈** |
| :------: |  :------: | :------: | :------: | :------: |
| [<img src="https://avatars.githubusercontent.com/u/58600024?s=64&v=4" height=150 width=150> <br/>](https://github.com/jjhoooon) | [<img src="https://avatars.githubusercontent.com/u/61533589?s=64&v=4" height=150 width=150> <br/>](https://github.com/joooo24) | [<img src="https://avatars.githubusercontent.com/u/95954000?s=64&v=4" height=150 width=150> <br/>](https://github.com/ssuminii) | [<img src="https://avatars.githubusercontent.com/u/156069479?s=64&v=4" height=150 width=150> <br/>](https://github.com/suhyang1166) | [<img src="https://avatars.githubusercontent.com/u/114380985?s=64&v=4" height=150 width=150> <br/>](https://github.com/leesanghun0) |
| Product Owner |  Scrum Master | Developer | Developer | Developer |
</div>

<br>

## 1. 개발 환경

- Front : HTML, CSS, React, Reudx-toolkit, React-Query
- Back-end : [서울 열린데이터 광장](https://data.seoul.go.kr/dataList/datasetList.do), json-server
- 버전 및 이슈관리 : Github, Github Project
- 협업 툴 : Slack, Notion, Discord
- 서비스 배포 환경 : Netlify
- 디자인 : [Figma](https://www.figma.com/file/tCF0bHEYY8Y6dv82xYS2qu/team3-metro?type=design&node-id=33-265&mode=design&t=dCaltVO6ay45OoiT-0)
<br>

## 2. 채택한 개발 기술과 브랜치 전략

### React, styled-component

- React
    - 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려했습니다.
    - 유저 배너, 상단과 하단 배너 등 중복되어 사용되는 부분이 많아 컴포넌트화를 통해 리소스 절약이 가능했습니다.
- styled-component
    - props를 이용한 조건부 스타일링을 활용하여 상황에 알맞은 스타일을 적용시킬 수 있었습니다.
    - 빌드될 때 고유한 클래스 이름이 부여되어 네이밍 컨벤션을 정하는 비용을 절약할 수 있었습니다.
    - S dot naming을 통해 일반 컴포넌트와 스타일드 컴포넌트를 쉽게 구별하도록 했습니다.
    
### Recoil

- 최상위 컴포넌트를 만들어 props로 유저 정보를 내려주는 방식의 경우 불필요한 props 전달이 발생합니다. 따라서, 필요한 컴포넌트 내부에서만 상태 값을 가져다 사용하기 위해 상태 관리 라이브러리를 사용하기로 했습니다.
- Redux가 아닌 Recoil을 채택한 이유
    - Recoil은 React만을 위한 라이브러리로, 사용법도 기존의 useState 훅을 사용하는 방식과 유사해 학습비용을 낮출 수 있었습니다.
    - 또한 Redux보다 훨씬 적은 코드라인으로 작동 가능하다는 장점이 있었습니다.
- 로그인과 최초 프로필 설정 시 유저 정보를 atom에 저장하여 필요한 컴포넌트에서 구독하는 방식으로 사용했습니다.

### eslint, prettier

- 정해진 규칙에 따라 자동적으로 코드 스타일을 정리해 코드의 일관성을 유지하고자 했습니다.
- 코드 품질 관리는 eslint에, 코드 포맷팅은 prettier에 일임해 사용했습니다.
- airbnb의 코딩 컨벤션을 참고해 사용했고, 예외 규칙은 팀원들과 협의했습니다.
- 협업 시 매번 컨벤션을 신경 쓸 필요 없이 빠르게 개발하는 데에 목적을 두었습니다.

### 브랜치 전략

- Git-flow 전략을 기반으로 main, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
- main, develop, Feat 브랜치로 나누어 개발을 하였습니다.
    - **main** 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
    - **Feat** 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.

<br>

## 3. 프로젝트 구조

<details>
<summary>구조 접기/펼치기</summary>
<div markdown="1">

```
📦src
 ┣ 📂actions
 ┃ ┣ 📜authenticateActions.js
 ┃ ┗ 📜favoritesActions.js
 ┣ 📂assets
 ┃ ┗ 📂images
 ┃ ┃ ┣ 📂line
 ┃ ┃ ┃ ┣ 📜line1.png
 ┃ ┃ ┃ ┣ 📜line2.png
 ┃ ┃ ┃ ┣ 📜line3.png
 ┃ ┃ ┃ ┣ 📜line4.png
 ┃ ┃ ┃ ┣ 📜line5.png
 ┃ ┃ ┃ ┣ 📜line6.png
 ┃ ┃ ┃ ┣ 📜line7.png
 ┃ ┃ ┃ ┗ 📜line8.png
 ┃ ┃ ┣ 📜left-arrow.svg
 ┃ ┃ ┣ 📜login.svg
 ┃ ┃ ┣ 📜mainlogo.svg
 ┃ ┃ ┣ 📜menuclose.svg
 ┃ ┃ ┣ 📜menusearch.svg
 ┃ ┃ ┣ 📜right-arrow.svg
 ┃ ┃ ┣ 📜search.svg
 ┃ ┃ ┣ 📜seoul-metro-map.svg
 ┃ ┃ ┣ 📜seoul-metro.svg
 ┃ ┃ ┣ 📜sidebar-main-img.svg
 ┃ ┃ ┣ 📜sorry.png
 ┃ ┃ ┣ 📜star.svg
 ┃ ┃ ┣ 📜subway.png
 ┃ ┃ ┗ 📜toggle.svg
 ┣ 📂common
 ┃ ┣ 📂FavoriteStationList
 ┃ ┃ ┣ 📜FavoriteStationList.css
 ┃ ┃ ┗ 📜FavoriteStationList.jsx
 ┃ ┗ 📂KakaoMap
 ┃ ┃ ┗ 📜KakaoMap.js
 ┣ 📂components
 ┃ ┗ 📂SideBar
 ┃ ┃ ┣ 📜SideBar.css
 ┃ ┃ ┗ 📜SideBar.jsx
 ┣ 📂hooks
 ┃ ┣ 📜useFavorites.js
 ┃ ┣ 📜useRealtimePosition.js
 ┃ ┣ 📜useSearchFirstAndLastTime.js
 ┃ ┣ 📜useStationAddress.js
 ┃ ┣ 📜useStationFullTIme.js
 ┃ ┣ 📜useStationInfo.js
 ┃ ┣ 📜useStationNameInfo.js
 ┃ ┣ 📜useStationPosition.js
 ┃ ┣ 📜useStationReqre.js
 ┃ ┣ 📜useStationReqreAll.js
 ┃ ┗ 📜useStationReqreTime.js
 ┣ 📂layouts
 ┃ ┣ 📂component
 ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┃ ┣ 📜Footer.css
 ┃ ┃ ┃ ┗ 📜Footer.jsx
 ┃ ┃ ┣ 📜Header.css
 ┃ ┃ ┗ 📜Header.jsx
 ┃ ┣ 📜AppLayout.css
 ┃ ┗ 📜AppLayout.jsx
 ┣ 📂pages
 ┃ ┣ 📂AdminPage
 ┃ ┃ ┣ 📂component
 ┃ ┃ ┃ ┣ 📜ReceiveList.css
 ┃ ┃ ┃ ┗ 📜ReceiveList.jsx
 ┃ ┃ ┣ 📜AdminPage.jsx
 ┃ ┃ ┗ 📜AdminPage.style.css
 ┃ ┣ 📂LoginPage
 ┃ ┃ ┣ 📜LoginPage.css
 ┃ ┃ ┗ 📜LoginPage.jsx
 ┃ ┣ 📂MainPage
 ┃ ┃ ┣ 📂component
 ┃ ┃ ┃ ┗ 📂SearchFrom
 ┃ ┃ ┃ ┃ ┣ 📜SearchForm.css
 ┃ ┃ ┃ ┃ ┗ 📜SearchForm.jsx
 ┃ ┃ ┣ 📜MainPage.css
 ┃ ┃ ┗ 📜MainPage.jsx
 ┃ ┣ 📂ResultPage
 ┃ ┃ ┣ 📂component
 ┃ ┃ ┃ ┣ 📂DepartureArrivalTime
 ┃ ┃ ┃ ┃ ┣ 📜DepartureArrivalTime.jsx
 ┃ ┃ ┃ ┃ ┗ 📜DepartureArrivalTime.style.css
 ┃ ┃ ┃ ┣ 📂ReportForm
 ┃ ┃ ┃ ┃ ┣ 📜ReportForm.jsx
 ┃ ┃ ┃ ┃ ┗ 📜ReportForm.style.css
 ┃ ┃ ┃ ┣ 📂RequiredTime
 ┃ ┃ ┃ ┃ ┣ 📜RequiredTime.jsx
 ┃ ┃ ┃ ┃ ┗ 📜RequiredTime.style.css
 ┃ ┃ ┃ ┣ 📜Stopover.css
 ┃ ┃ ┃ ┗ 📜Stopover.jsx
 ┃ ┃ ┣ 📜ResultPage.css
 ┃ ┃ ┗ 📜ResultPage.jsx
 ┃ ┣ 📂StationDetailPage
 ┃ ┃ ┣ 📂component
 ┃ ┃ ┃ ┣ 📂ArrivalInfo
 ┃ ┃ ┃ ┃ ┗ 📜ArrivalInfo.jsx
 ┃ ┃ ┃ ┣ 📂FullSubwayMap
 ┃ ┃ ┃ ┃ ┣ 📜FullSubwayMap.css
 ┃ ┃ ┃ ┃ ┗ 📜FullSubwayMap.jsx
 ┃ ┃ ┃ ┣ 📂FullTimetable
 ┃ ┃ ┃ ┃ ┣ 📜FullTimetable.css
 ┃ ┃ ┃ ┃ ┗ 📜FullTimetable.jsx
 ┃ ┃ ┃ ┣ 📂RealTimeInfo
 ┃ ┃ ┃ ┃ ┗ 📜RealTimeInfo.jsx
 ┃ ┃ ┃ ┣ 📂StationAddressInfo
 ┃ ┃ ┃ ┃ ┗ 📜StationAddressInfo.jsx
 ┃ ┃ ┃ ┗ 📂StationList
 ┃ ┃ ┃ ┃ ┗ 📜StationList.jsx
 ┃ ┃ ┣ 📜StationDetailPage.css
 ┃ ┃ ┗ 📜StationDetailPage.jsx
 ┃ ┣ 📜ErrorPage.jsx
 ┃ ┣ 📜NotFoundPage.jsx
 ┃ ┗ 📜PrivateRoute.jsx
 ┣ 📂store
 ┃ ┣ 📜authenticateReducer.js
 ┃ ┣ 📜favoritesSlice.js
 ┃ ┣ 📜index.js
 ┃ ┗ 📜reportsSlice.js
 ┣ 📂utils
 ┃ ┣ 📂time
 ┃ ┃ ┣ 📜addMinutes.js
 ┃ ┃ ┣ 📜calTime.js
 ┃ ┃ ┗ 📜timeToMinutes.js
 ┃ ┗ 📜api.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
```
</div>
</details>
<br>

## 4. 역할 분담

### 😎 장재훈

- **UI**
    - 페이지 : 홈, 검색, 게시글 작성, 게시글 수정, 게시글 상세, 채팅방
    - 공통 컴포넌트 : 게시글 템플릿, 버튼
- **기능**
    - 유저 검색, 게시글 등록 및 수정, 게시글 상세 확인, 댓글 등록, 팔로워 게시글 불러오기, 좋아요 기능

<br>
    
### 🍊 주현정

- **UI**
    - 페이지 : 프로필 설정, 프로필 수정, 팔로잉&팔로워 리스트, 상품 등록, 상품 수정, 채팅 목록, 404 페이지
    - 공통 컴포넌트 : 탭메뉴, InputBox, Alert 모달, 댓글
- **기능**
    - 프로필 설정 및 수정 페이지 유저 아이디 유효성 및 중복 검사, 상품 등록 및 수정

<br>

### 😎 김수민

- **UI**
    - 페이지 : splash 페이지, sns 로그인 페이지, 로그인, 회원가입
    - 공통 컴포넌트 : 상품 카드, 사용자 배너
- **기능**
    - splash 페이지, sns로그인 페이지, 로그인 유효성 및 중복 검사, 회원가입 유효성 및 중복 검사, 이메일 검증, 프로필 설정, 접근제한 설정

<br>

### 😎 김수향

- **UI**
    - 페이지 : 사용자 프로필 페이지
    - 공통 컴포넌트 : 탑배너, 하단 모달창
- **기능**
    - 팔로우 & 언팔로우, 로그아웃, 하단 모달창, 댓글 삭제, 게시글 삭제, 상품 삭제, 사용자 게시글 앨범형 이미지, 탑 배너 뒤로가기 버튼, Alert 모달

### 😎 이상훈

- **UI**
    - 페이지 : 사용자 프로필 페이지
    - 공통 컴포넌트 : 탑배너, 하단 모달창
- **기능**
    - 팔로우 & 언팔로우, 로그아웃, 하단 모달창, 댓글 삭제, 게시글 삭제, 상품 삭제, 사용자 게시글 앨범형 이미지, 탑 배너 뒤로가기 버튼, Alert 모달    
<br>

## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2024-04-15 ~ 2024-04-21
- UI 구현 : 2024-04-15 ~ 2024-04-21
- 기능 구현 : 2024-04-15 ~ 2024-04-21

<br>

### 작업 관리

- GitHub Projects와 Issues를 사용하여 진행 상황을 공유했습니다.
- 주간회의를 진행하며 작업 순서와 방향성에 대한 고민을 나누고 GitHub Wiki에 회의 내용을 기록했습니다.

<br>


## 6. 페이지별 기능

### [초기화면]
- 서비스 접속 초기화면으로 splash 화면이 잠시 나온 뒤 다음 페이지가 나타납니다.
    - 로그인이 되어 있지 않은 경우 : SNS 로그인 페이지
    - 로그인이 되어 있는 경우 : README 홈 화면
- SNS(카카오톡, 구글, 페이스북) 로그인 기능은 구현되어 있지 않습니다.

| 초기화면 |
|----------|

<br>

## 7. 개선 목표

- API 모듈화 : API를 불러오는 코드의 반복이 많아 모듈화할 예정
- lighthouse Performance 증진
    - 모든 페이지에서 특히 Best Practices & SEO 점수는 90~100으로 우수
    - Performance 점수가 대체적으로 미흡한 문제
    
    ![KakaoTalk_Photo_2023-01-04-16-55-30](https://user-images.githubusercontent.com/112460466/210591134-09bf8efd-3c34-4b99-a3d7-895ca99e1457.png)
    
- **23-01-17 성능 개선 내용**
    
    ![성능개선 후](https://user-images.githubusercontent.com/106502312/212872369-7ceeb2cf-d551-41d2-bfb0-01e35e9903fe.png)
    
    - 이미지 최적화
        - `<img>` 요소에 `width` , `height` 속성값을 명시해 불필요한 Reflow를 방지했습니다.
        - browser-image-compression 라이브러리를 사용해 유저가 업로드하는 이미지를 압축했습니다.
        - Intersection Observer API를 사용해 Lazy Loading 기법을 적용하여 홈 피드의 게시글 이미지가 viewport 내에 들어오는 순간 로딩되도록 변경했습니다.
    - 웹폰트 최적화
        - WOFF2 포맷을 추가하고 가장 우선적으로 적용되도록 선언했습니다.
        - 서브셋 폰트로 교체해 용량을 줄였습니다.
    
<br>

## 8. 프로젝트 후기

### 😎 장재훈

깃헙을 통한 협업에 익숙해지는 것, 서로 감정 상하지 않고 무사히 마무리하는 것이 1차적인 목표였어서 항상 이 부분을 명심하면서 작업했습니다.
각자 페이지를 작업하고 합치는 과정에서 마주친 버그들이 몇 있었는데, 시간에 쫓기느라 해결하기에 급급해서 제대로 트러블슈팅 과정을 기록하지 못한 게 살짝 아쉬운 부분으로 남습니다. 그래도 2022년 한 해 동안 가장 치열하게 살았던 한 달인 것 같습니다. 조원들 모두에게 고생했다고 전하고 싶습니다🧡

<br>

### 😎 주현정

여러모로 많은 것들을 배울 수 있었던 한 달이었습니다. 혼자서는 할 수 없었던 일이라는 것을 너무 잘 알기에 팀원들에게 정말 감사하다는 말 전하고 싶습니다. 개인적으로 아쉬웠던 부분은 기한 내에 기능을 구현하는 데에만 집중하면서 트러블 슈팅이나 새로 배웠던 것들을 체계적으로 기록하지 못했다는 점입니다. 이렇게 느낀 바가 있으니 이후의 제가 잘 정리하면서 개발할 거라 믿습니다… 하하 다들 수고하셨습니다!!!!

<br>

### 😎 김수민

팀 프로젝트 시작에 앞서 초기 설정을 진행하며 체계적인 설계의 중요성을 느꼈습니다. 앞으로는 점점 더 체계적이고 효율적으로 프로젝트를 진행할 수 있도록 발전하고 싶습니다.
정규 수업 직후에 프로젝트를 진행하면서 배운 내용을 직접 구현하는 과정이 어색했지만 어떤 부분이 부족한지 알 수 있는 기회였습니다. 스스로 최대한 노력해보고 팀원들과 함께 해결해 나가면서 협업의 장점을 체감할 수 있었습니다. 하지만 빠르게 작업을 진행하면서 팀원들과 함께 해결한 이슈가 어떤 이슈이며 어떻게 해결했는지에 대해 자세히 작성하지 못한 것이 아쉽습니다.
’멋쟁이 사자처럼’이라는 같은 목표를 가진 집단에서 프로젝트에 함께할 수 있는 소중한 경험이었습니다. 함께 고생한 조원들 모두 고생하셨습니다! 앞으로도 화이팅해서 함께 목표를 이뤄가고 싶습니다.

<br>

### 😎 김수향

컨벤션을 정하는 것부터 Readme 파일 작성까지 전 과정을 진행하려니 처음 생각보다 많은 에너지를 썼어요. 좋은 의미로 많이 썼다기보다, 제 능력을 십분 발휘하지 못해서 아쉬움이 남는 쪽입니다. 개발한다고 개발만 해서는 안 된다는 것을 몸소 느껴보는 기간이었던 것 같습니다. 이번 기회로 프로젝트를 진행하면서, 제가 잘하는 점과 부족한 점을 확실하게 알고 가는 건 정말 좋습니다. 기술적인 부분에 있어서는 리액트의 컴포넌트화가 주는 장점을 알았습니다. 조금 느린 개발이 되었을지라도 코드 가독성 부분에 있어서 좋았고, 오류가 발생해도 전체가 아닌 오류가 난 컴포넌트와 근접한 컴포넌트만 살펴보면 수정할 수 있는 부분이 너무 편했습니다. 모두 고생 참 많으셨고 리팩토링을 통해 더 나은 프로젝트 완성까지 화이팅입니다.

<br>

### 😎 이상훈

컨벤션을 정하는 것부터 Readme 파일 작성까지 전 과정을 진행하려니 처음 생각보다 많은 에너지를 썼어요. 좋은 의미로 많이 썼다기보다, 제 능력을 십분 발휘하지 못해서 아쉬움이 남는 쪽입니다. 개발한다고 개발만 해서는 안 된다는 것을 몸소 느껴보는 기간이었던 것 같습니다. 이번 기회로 프로젝트를 진행하면서, 제가 잘하는 점과 부족한 점을 확실하게 알고 가는 건 정말 좋습니다. 기술적인 부분에 있어서는 리액트의 컴포넌트화가 주는 장점을 알았습니다. 조금 느린 개발이 되었을지라도 코드 가독성 부분에 있어서 좋았고, 오류가 발생해도 전체가 아닌 오류가 난 컴포넌트와 근접한 컴포넌트만 살펴보면 수정할 수 있는 부분이 너무 편했습니다. 모두 고생 참 많으셨고 리팩토링을 통해 더 나은 프로젝트 완성까지 화이팅입니다.
