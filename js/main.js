const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// window는 우리가 보고있는 화면 자체이다.
// 윈도우객체는 브라우저가 가지고 있는 여러가지 명령들을 들고 있다. 
// _.throttle(사용하려는 함수 넣기, 몇초에 한번씩 실행되면 되는지를 밀리세컨드 다위로 시간을 추가하기)
window.addEventListener("scroll", _.throttle(function (){
  console.log(window.scrollY);
  // 화면이 스크롤될때마다 window라는 객체부분에 있는 scrollY라는 속성 부분의 값이 그때그때 갱신된다.
  //우리는 이 scrollY를 통해서 지금 화면이 위에서부터 몇픽셀 지점에 위치하고 있는지를 파악할 수 있어요.
  if (window.scrollY > 500) {
    // gsap.to(요소,지속시간(초단위),옵션);
    // 굉장히 많은 경우에, 다양한 외부의 자바스크립트 라이브러리들은 옵션으로 객체 데이터를 사용한다
    gsap.to(badgeEl, .6, {
      opacity : 0,
      display : 'none'
    });
    // 스크롤업 버튼 보이기!
    gsap.to(toTopEl, .2, {
      x:0
    });
  } 
  else {
    gsap.to(badgeEl, .6, {
      opacity : 1,
      display : 'block'
    });
    // 스크롤업 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300)); //300 = 0.3초


toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0,
  });
})


const fadeEls = document.querySelectorAll('.visual .fade-in');
// HTML에서 찾은 .fade-in이라는 요소의 갯수만큼 이 forEach라는 메소드의 인수로 적은 함수가 실행된다.
// 반복처리하는 함수는 fade-in이라는 클래스를 가지고 있는 요소들을 하나씩 순차적으로 함수에서 쓸수있게 데이터로 내어주는데 우리는 통상적으로 fadeEl라는 단어 형태로 받아서 쓸 수 있다. hello 등 맘대로 작명할 수있지만, 좀 더 직관적으로 각각의 반복되는 fade-in이라는 요소 라고 이름 적어준다.
// 두번째 매개변수로는 반복되는 횟수로 index라는 이름으로 받아서 사용할 수 있다.
fadeEls.forEach(function (fadeEl, index) {
  //gsap.to(요소, 지속시간(초), 객체)
  //gsap이라는 애니메이션 라이브러리 - delay 라는 옵션
  // 첫번째 index는 0이다. (zero-numbering) 0에다 0.7을 곱하면 어차피 0이므로, index+1 * 7을 해준다.
  gsap.to(fadeEl, 1, {
    delay : (index+1) * .7, // 0.7, 1.4, 2.1, 2.7
    opacity: 1
  })
})


// 슬라이드 요소 관리
// new Swiper() 함수. ()안에는 선택자, 옵션을 넣는다.
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', 
  autoplay: true,
  loop : true
})

new Swiper('.promotion .swiper-container', {
  // Swiper의 direction의 디폴트값 : horizontal
  autoplay: {
    // ms 단위. 500은 0.5초 / 5000은 5초
    // 5초에 한번씩 자동으로 슬라이드 됨
    delay: 5000 
  },
  loop: true,
  slidesPerView : 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween : 10, //슬라이드들 사이의 여백(px)
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  // 방금 만든 swiper-pagination이라는 요소를 실제로 페이지 번호를 사용하는 그 요소로 사용하겠다는 의미로 이렇게 선택자를 넣어주면, swipeJS내부에서 이 선택자에 맞는 요소를 찾아서 페이지 번호를 사용할 수 있도록 동작이 된다.
  pagination: {
    el: '.promotion .swiper-pagination', 
    clickable : true
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');

// let 변수로 프로모션 영역이 숨겨져있니? ( true로 할당될수있음 ) 
let isHidePromotion = false; // 안숨겨져있다. 보이고 있다.
promotionToggleBtn.addEventListener("click", function(){
  // 어떤 특정 변수의 값을 지속적으로 반대값으로 전환시켜줄 수 있는 코드
  // click 시, isHidPromotion은 false에서 true가 되어서 숨겨져있니? -> 'true! 숨겨졌어'를 의미함
  // isHidePromotion에 반대값을 할당한다.!는 반대가 되도록 만들어줌. false -> true값으로 할당됨.
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    //숨김처리
    promotionEl.classList.add('hide');
  } else {
    //보임처리
    promotionEl.classList.remove('hide');
  }
});

function random(min,max) {
  return parseFloat((Math.random() * (max-min)+min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간, 옵션)
  gsap.to(
    selector, //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션
    y: size, // y축으로 얼마만큼 애니메이션 처리를 할 것이냐를 지정한다.
    repeat: -1, // 무한 반복
    yoyo: true, // 한 번 재생된 애니메이션을 다시 뒤로 재생을 해서 밑으로 내려왔다가 다시 위로 올라갈 수 있는 구조 
    ease: Power1.easeInOut, // 위아래로 오르내리는 반복이 조금 더 자연스러워진다
    delay: random(0, delay) // 몇 초뒤에 애니메이션을 실행하겠다 (지연시간을 실행하는 옵션)
    }
  );
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  //Scene : ScrollMagic이라는 외부 라이브러리를 통해서 특정한 요소를 감시하는 옵션을 지정해주는 메소드이다. 지금 화면을 위아래로 스크롤하면서 우리가 제어하려는 특정 세션들이 화면에 보이는지, 안보이는지를 이 라이브러리의 도움을 받아서 감시해야한다. 그럴때 그것을 감시할때 필요한 여러가지 옵션들을 이 Scene이라는 메소드에 추가해주면된다.
  //setClassToggle : HTML class를 무엇인가로 지정한다. 클래스를 넣었다 뺏다하는 toggle로 지정하는 등 제어해주는 역할을 한다.
  //addTo() : ScrollMagic 이라는 라이브러리가 필요한 컨트롤러라는 개념의 내용을 추가하기 위해 사용하는 메소드이다.
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정한다.
      triggerHook: .8, //뷰포트의 위아래를 0과 1로 봤을 때 0.8은 80퍼센트 지점에 해당한다. Hook은 갈고리를 의미. triggerHook은 내가 감시하고있는 요소가 뷰포트의 어떤 지점에서 감시되었다는 것을 판단할것인가를 지정해주는 옵션이다.
    })
    .setClassToggle(spyEl, 'show') //토글할 요소, '클래스명'
    .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
// textContent : 글자내용
thisYear.textContent = new Date().getFullYear();