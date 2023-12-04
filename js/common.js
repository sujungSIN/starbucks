const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener("click", function() {
  searchInputEl.focus();
});

searchInputEl.addEventListener("focus", function() {
  // classList라는 객체를 추가한다음에 add라는 메소드 실행
  // 어떤 class 내용을 추가하겠다고 선언함
  searchEl.classList.add('focused');
  // setAttribute : HTML의 속성을 지정하는 메소드
  searchInputEl.setAttribute('placeholder','통합검색');
})

  // input 요소에 focus가 해제되면(blur) placeholder 속성이 사라지게끔. 
searchInputEl.addEventListener("blur", function() {
  // remove 함수이용해서 focused 클래스 지우기
  searchEl.classList.remove('focused');
  // placeholder 값을 빈문자를 할당한다.
  searchInputEl.setAttribute('placeholder','');
})

const thisYear = document.querySelector('.this-year');
// textContent : 글자내용
thisYear.textContent = new Date().getFullYear();