<template>
  <div class="about">
    <!-- <div class="loadingAbout">
      <span>loading</span>
    </div> -->


    <img src="@/assets/img/0.png" class="head-img" />

    <div class="section s01">
      <div class="inner">

        <div class="main-title">
          <div class="main-text">
            <div class="row"><span>About</span> <span class="main-emoji">😡😨😭🤢😳🤔😌😄</span></div>
            <div class="row"><span>Indescribable</span></div>
            <div class="row"><span>Emotions</span></div>
          </div>

          <img src="@/assets/img/about/0_title-1.png" class="tit-1" />
          <img src="@/assets/img/about/0_title-2.png" class="tit-2" />
          <img src="@/assets/img/about/0_title-3.png" class="tit-3" />
          <img src="@/assets/img/about/0_title-4.png" class="tit-4" />
        </div>

        <div class="main-sub">
          <div class="sub-desc">
            <img src="@/assets/img/Star.png" class="star" />

            <span class="url">emotions.kr</span>
            <span class="title">형용할 수 없는 감정에 대하여</span>
            <span>Hyejeong Lim</span>
            <span>Prof. Younghui Kim</span>
          </div>
        </div>

      </div>
    </div>


    <div class="section s02">
      <div class="inner">

        <div class="over-desc">
          <span class="en-title">Overview</span>
          <span class="small-title">말로 표현할 수 없는 감정이 있나요?</span>
          <p class="content">
            사람은 누구나 표현할 수 없는 감정이 있습니다.
            <br>
            특별한 기억이나 특정한 상황, 대상에 대한 감정, 미래에 대한 기대와 과거의 회상으로도 느낄 수 있습니다.
            <br>
            이 프로젝트는 언어로 표현할 수 없는 복합적인 감정을 3D 오브젝트 형태로 표현하고,<br class="pc-only"><br class="tab-only">
            웹 사이트상에 아카이브하여 많은 사람의 감정을 보관하고 감상할 수 있도록 하고자 합니다.
          </p>
        </div>


        <div class="back_bg">
          <img src="@/assets/img/about/1_bg.png" alt="어두운 밤하늘 속 별을 보고 있는 사람">
        </div>

      </div>
    </div>


    <div class="section s03">
      <div class="inner">
          <span class="en-title">🤔</span>
          <span class="small-title">표현할 수 없는 감정을 어떻게 추출하고,<br class="mo-only"> 어떤 원리로 분석할 수 있을까요?</span>
          <p class="content">온라인으로 커뮤니케이션에서 사용되는 부가적인 표현 방법이자,<br>
더욱 효과적으로 의미 전달이 가능한 <br class="mo-only"><strong>이모지</strong>를 통해 감정 데이터를 얻습니다.</p>

          <img src="@/assets/img/about/2_img.png" alt="이모지 리스트">

          <p class="content">
            사용자가 느끼는 감정과 관련된 이모지의 조합을 입력받아<br class="mo-only"> 어떠한 감정인지 파악합니다.
          </p>
      </div>
    </div>


    <div class="section s04">
      <div class="inner">
        <span class="en-title">Solution</span>
        <img src="@/assets/img/about/3_icon.png" alt="감정의 바퀴 아이콘" class="icon">

        <p class="content">
          로버트 플루칙의 &lt;감정의 바퀴&gt;에 따라 총 100개의 이모지에<br> 8개의 감정 카테고리에 대한 점수와 활동성을 띄는 숫자(1~10)를 부여했습니다.
        </p>

        <ul class="emo-list">
          <li class="emo-item">
            <span class="emo">😡</span>
            <span class="en">anger</span>
            <span class="ko">분노</span>
          </li>

          <li class="emo-item">
            <span class="emo">😨</span>
            <span class="en">fear</span>
            <span class="ko">공포</span>
          </li>

          <li class="emo-item">
            <span class="emo">😭</span>
            <span class="en">sadness</span>
            <span class="ko">슬픔</span>
          </li>

          <li class="emo-item">
            <span class="emo">🤢</span>
            <span class="en">disgust</span>
            <span class="ko">혐오</span>
          </li>

          <li class="emo-item">
            <span class="emo">😳</span>
            <span class="en">surprise</span>
            <span class="ko">불안</span>
          </li>

          <li class="emo-item">
            <span class="emo">🤔</span>
            <span class="en">anticipation</span>
            <span class="ko">기대</span>
          </li>

          <li class="emo-item">
            <span class="emo">😌</span>
            <span class="en">trust</span>
            <span class="ko">신뢰</span>
          </li>

          <li class="emo-item">
            <span class="emo">😄</span>
            <span class="en">joy</span>
            <span class="ko">기쁨</span>
          </li>

        </ul>


        <div class="emo-table">

          <div class="emo-count">
            <span>1</span>
            <span class="line"></span>
            <span>100</span>
          </div>
        
          <table>
            <thead>
              <tr>
                <th>Num</th>
                <th>emoji</th>
                <th>anger</th>
                <th>fear</th>
                <th>sadness</th>
                <th>disgust</th>
                <th>surprise</th>
                <th>anticipation</th>
                <th>trust</th>
                <th>JOY</th>
                <th>Activity</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>😀</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td><strong>2</strong></td>
                <td><strong>8</strong></td>
                <td><strong>2</strong></td>
              </tr>
              <tr>
                <td>2</td>
                <td>😡</td>
                <td><strong>10</strong></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td><strong>8</strong></td>
              </tr>
              <tr>
                <td>2</td>
                <td>😱</td>
                <td>0</td>
                <td><strong>10</strong></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td><strong>10</strong></td>
              </tr>
              <tr>
                <td>4</td>
                <td>😍</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td><strong>10</strong></td>
                <td><strong>8</strong></td>
              </tr>
              <tr>
                <td>5</td>
                <td>🤩</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td><strong>5</strong></td>
                <td><strong>5</strong></td>
                <td>0</td>
                <td><strong>9</strong></td>
              </tr>
              <tr>
                <td>6</td>
                <td>🫣</td>
                <td>0</td>
                <td><strong>5</strong></td>
                <td>0</td>
                <td>0</td>
                <td><strong>5</strong></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td><strong>3</strong></td>
              </tr>
              <tr>
                <td>7</td>
                <td>🤯</td>
                <td><strong>10</strong></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td><strong>8</strong></td>
              </tr>
            </tbody>
            
          </table>
        </div>

        <p class="content">
          선택된 이모지들의 데이터가 분석되어<br class="mo-only"> 메쉬를 이루는 구성 요소에 영향을 미칩니다.<br>
대표적으로 드러나는 감정은 3D 오브젝트의 구조,<br class="mo-only"> 감정의 복합성은 재질, 감정의 세기는 움직임으로  표현됩니다.
        </p>

      </div>
    </div>


    <div class="section s05">
      <div class="inner">
        <figure><img src="@/assets/img/about/5_mesh.png" alt="Mesh"></figure>
        <figure><img src="@/assets/img/about/5_info.png" alt="Component of Mesh"></figure>
      </div>
    </div>


    <div class="section s06">
      <div class="inner">
        <span class="en-title">Visualization</span>
        <img src="@/assets/img/about/6_visualization.png" loading="lazy" class="visualization pc-only" alt="visualization" />
        <img src="@/assets/img/about/6_visualization.png" loading="lazy" class="visualization tab-only" alt="visualization" />
        <img src="@/assets/img/about/6_visualization_mo.png" loading="lazy" class="visualization mo-only" alt="visualization" />

        <p class="content">
          8개의 감정 카테고리에 따른<br class="mo-only"> 기본 지오메트리를 만들어 지정해주었습니다.
        </p>
      </div>
    </div>


    <div class="section s07">
      <div class="inner">

        <div class="table-desc">
          <span class="sub-title">01</span>
          <span class="en-title">Geometry</span>
          <p class="content">
            가장 높은 점수의 감정 에 해당하는 지오메트리가 메쉬의 베이스가 됩니다.
          </p>
        </div>

        <div class="emo-table geo-table">
          <table>
            <thead>
              <tr>
                <th>Emotion</th>
                <th>anger</th>
                <th>fear</th>
                <th>sadness</th>
                <th>disgust</th>
                <th>surprise</th>
                <th>anticipation</th>
                <th>trust</th>
                <th>JOY</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Geometry</td>
                <td>anger</td>
                <td>fear</td>
                <td>sadness</td>
                <td>disgust</td>
                <td>surprise</td>
                <td>anticipation</td>
                <td>trust</td>
                <td>JOY</td>
              </tr>
            </tbody>
            
          </table>
        </div>



      </div>
    </div>



    <img src="https://user-images.githubusercontent.com/84780174/207597419-6d754b65-3896-4840-8b17-fb07e8f1d07d.gif"
      loading="lazy" />



    <img src="@/assets/img/5.png" style="margin-bottom: 100px" loading="lazy" />
    <img src="https://user-images.githubusercontent.com/84780174/207597164-7aeb252f-04b0-4649-841d-fbba036ed40e.gif"
      loading="lazy" />
    <!-- <img loading="lazy" src="@/assets/img/7.gif" alt="" /> -->
    <img src="@/assets/img/8.png" loading="lazy" />
    <img src="https://user-images.githubusercontent.com/84780174/207597631-7aa23f1f-41d1-4fd4-bbd1-85ae1ff8b75f.gif"
      loading="lazy" />
    <!-- <img loading="lazy" src="@/assets/img/9.gif" style="" alt="" /> -->
    <img src="@/assets/img/10.png" loading="lazy" />
  </div>
</template>

<script>
export default {
  name: "AboutView",
  components: {},
  setup() { },
};
</script>

<style lang="scss">
.loadingAbout {
  width: 100%;
  height: 100vh;
  background: #000;

  span {
    color: #fff;
  }
}

.about {
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100vh;
  // padding-top: 100px;
}

img {
  width: 100%;
}




.section {
  background-color: #000;
  color: var(--black);
  display: flex;
  justify-content: center;

  .inner {
    width: 100%;
    max-width: 1156px;
    padding: 100px 32px;

    .en-title {
      font-size: 35px;
      font-family: 'YdestreetB';
      color: var(--point);
    }

    .small-title {
      font-size: 30px;
      color: #fff;
      font-weight: 700;
      letter-spacing: -3px;
      line-height: 1.5;
    }

    .content {
      color: var(--gray1);
      font-size: 20px;
      line-height: 1.8;
      letter-spacing: -0.1rem;

      strong {
        color: var(--point);
        font-weight: 600;
      }
    }
  }

}

.s01 {

  .main-title {
    position: relative;

    .main-text {

      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-family: 'YdestreetB';
          font-size: 110px;
          color: var(--point);
          z-index: 1;
        }

        .main-emoji {
          padding: 7px 50px;
          font-size: 48px;
          letter-spacing: 3px;
          border: 2px solid var(--point);
          border-radius: 50px;
          z-index: 0;
        }

        &:nth-child(2) {
          justify-content: flex-end;
        }
      }
    }

    img {
      position: absolute;
      transform: translate(-50%, -50%);

      &.tit-1 {
        top: 18%;
        left: 46%;
        width: 160px;
      }

      &.tit-2 {
        top: 37%;
        left: 100%;
        width: 160px;
      }

      &.tit-3 {
        top: 65%;
        left: 10%;
        width: 160px;
      }

      &.tit-4 {
        top: 82%;
        left: 72%;
        width: 300px;
        z-index: 2;
      }
    }

  }

  .main-sub {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 100px;

    .sub-desc {
      display: flex;
      flex-direction: column;
      gap: 8px;

      img.star {
        width: 50px;
      }

      span {
        color: var(--gray1);
        font-size: 1rem;
        font-weight: 400;
        font-family: 'YdestreetB';

        &.url {
          color: var(--point);
          font-weight: bold;
          font-size: 25px;
        }

        &.title {
          font-weight: 500;
          font-family: 'gothicA1';
          margin-bottom: 10px;
        }
      }

    }
  }

}

.s02 {
  height: 800px;
  position: relative;

  .inner {
    display: flex;
    align-items: center;

    .over-desc {
      display: flex;
      flex-direction: column;
      gap: 40px;
      z-index: 1;

      .sec-ques {
        color: #fff;
      }
    }


    .back_bg {
      position: absolute;
      height: 100%;
      z-index: 0;
      right: 0;
      top: 0;

      img {
        object-fit: cover;
      }

      &:after {
        content: '';
        position: absolute;
        transform: translateX(-50%);
        left: 15%;
        width: 500px;
        height: 100%;
        background: linear-gradient(90deg, black, transparent);
      }
    }
  }
}

.s03 {
  .inner {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 25px;

    .en-title {
      font-size: 100px;
    }

    .small-title {
      color: var(--point);
      margin-bottom: 20px;
    }

    img {
      margin-top: 20px;
      transform: translateX(20px);
    }
  }
}

.s04 {

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 100px 0px; 

    .icon {
      width: 150px;
      margin: 20px 0;
    }

    .emo-list {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(8, 1fr);
      margin-top: 50px;

      .emo-item {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .emo {
          font-size: 45px;
        }

        .en {
          font-size: 15px;
          text-transform: uppercase;
          font-family: "YdestreetB";
        }

        .ko {
          font-size: 14px;
          color: var(--gray1);
        }
      }
    }

    .emo-table {
      position: relative;
      width: 100%;
      margin: 80px 0 80px;
      display: flex;
      overflow-x: scroll;

      .emo-count {
        display: flex;
        flex-direction: column;
        color: #aaa;
        height: 100%;
        align-items: center;
        font-size: 12px;
        width: 50px;
        min-width: 50px;

        span {
          padding: 10px 0;
          font-family: 'YdestreetB';
        }

        .line {
          width: 1px;
          height: 100%;
          background-color: #333;
        }
      }

      table {
        width: 100%;
        border-collapse: collapse;
        min-width: 1000px;

        thead {
          background-color: #0E0E0E;
          height: 30px;

          th {
            font-size: 11px;
            color: #a1a1a1;
            font-family: 'YdestreetB';
            border: none;
            border-collapse: collapse;
            letter-spacing: -0.5px;

            &:first-child {
              width: 70px;
            }

            &:last-child {
              width: 70px;
            }

            &:not(:first-child, :last-child) {
              text-transform: uppercase;
              width: 105px;
            }

            &:not(:last-child) {
              border-right: 1px solid #252525;
            }
          }
        }

        tbody {
          color: #444;

          tr {
            background-color: #222222;
            height: 60px;

            &:nth-child(-2n+8) {
              background-color: #0E0E0E;
            }

            td {
              font-size: 12px;
              font-family: 'YdestreetB';
              border: none;
              border-collapse: collapse;

              &:nth-child(1) {
                color: #a1a1a1;
              }
              &:nth-child(2) {
                font-size: 20px;
              }

              &:not(:last-child) {
                border-right: 1px solid #333;
              }

              strong {
                font-family: 'YdestreetB';
                font-weight: 700;
                color: var(--black);
              }
            }
          }
        }

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50px;
          width: 100%;
          max-width: calc(1156px - 50px);
          height: 250px;
          background: linear-gradient(0deg, black, transparent);
        }
      }

    }

  }
}

.s05 {
  .inner {
    display: flex;
    align-items: center;
    padding: 0 32px 100px;
    column-gap: 50px;

    figure {
      &:nth-child(1) {
          width: 55%;
        }
        &:nth-child(2) {
          width: 45%;
        }

      img {
        object-fit: cover;
      }
    }
  }
}

.s06 {
  text-align: center;

  .visualization {
    box-shadow: -2px -2px 10px 0px rgba(255,255,255,0.1),
    10px 10px 30px 0px rgba(16,16, 16, 1);
    margin: 40px 0;
  }
}




.s07, .s08, .s09 {

  .table-desc {
    display: flex;
    flex-direction: column;
    margin-bottom: 70px;

    .sub-title {
      font-size: 20px;
    }

    .en-title {
      color: var(--point);
    }
  }

  .emo-table {
    position: relative;
    width: 100%;
    display: flex;

    table {
      border: 1px solid gold;

      thead {


      }
    }
  }
}


@media screen and (max-width: 1023px) {
  .section {
    .inner {
      padding: 75px 32px;

      .en-title {
        font-size: 30px;
        font-family: 'YdestreetB';
        color: var(--point);
      }

      .small-title {
        font-size: 22px;
        color: #fff;
        font-weight: 700;
        letter-spacing: -3px;
      }

      .content {
        font-size: 16px;
        line-height: 1.8;
      }
    }
  }

  .s01 {

    .main-title {
      width: 100%;

      .main-text {

        .row {
          span {
            font-size: 8vw;
          }

          .main-emoji {
            padding: 3px 20px;
            font-size: 4.5vw;
            letter-spacing: 1px;
          }
        }
      }

      img {
        position: absolute;
        transform: translate(-50%, -50%);

        &.tit-1 {
          top: 18%;
          left: 42%;
          width: 11vw;
        }

        &.tit-2 {
          top: 37%;
          left: 95%;
          width: 12vw;
        }

        &.tit-3 {
          top: 53%;
          left: 15%;
          width: 12vw;
        }

        &.tit-4 {
          top: 84%;
          left: 65%;
          width: 20vw;
          z-index: 2;
        }
      }

    }

    .main-sub {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 70px;

      .sub-desc {
        display: flex;
        flex-direction: column;
        gap: 8px;

        img.star {
          width: 30px;
        }

        span {
          font-size: 14px;
          font-weight: 400;
          font-family: 'YdestreetB';

          &.url {
            color: var(--point);
            font-weight: bold;
            font-size: 20px;
          }

          &.title {
            font-weight: 500;
            font-family: 'gothicA1';
            margin-bottom: 10px;
          }
        }

      }
    }

  }

  .s02 {
    height: 800px;

    .inner {
      align-items: flex-end;

      .over-desc {
        gap: 30px;
      }


      .back_bg {
        &:after {
          display: none;
        }
      }
    }
  }

  .s03 {
    .inner {
      gap: 20px;

      .en-title {
        font-size: 90px;
      }

      .small-title {
        margin-bottom: 10px;
        color: var(--point);
      }

      img {
        margin-top: 10px;
      }
    }
  }

  .s04 {

    .inner {
      padding: 70px 0px; 

      .icon {
        width: 120px;
        margin: 20px 0;
      }

      .emo-list {
        grid-template-columns: repeat(4, 1fr);
        margin-top: 50px;
        row-gap: 40px;
        max-width: 768px;

        .emo-item {
          display: flex;
          flex-direction: column;
          gap: 5px;

          .emo {
            font-size: 45px;
          }

          .en {
            font-size: 14px;
          }

          .ko {
            font-size: 13px;
          }
        }
      }

      .emo-table {
        margin: 60px 0 60px;
        display: flex;
        overflow-x: scroll;
        padding: 0 32px 32px 0;

        .emo-count {
          width: calc(5% + 32px);
          min-width: 82px;

          span {
            padding: 10px 0;
          }

          .line {
            width: 1px;
            height: 100%;
          }
        }

        table {
          min-width: 920px;

          thead {
            height: 30px;

            th {
              font-size: 11px;

              &:not(:last-child) {
                width: 105px;
              }

              &:first-child {
                width: 70px;
              }

              &:last-child {
                width: 70px;
              }

            }
          }

          tbody {

            tr {
              height: 60px;

              td {
                font-size: 12px;
                font-family: 'YdestreetB';
                border: none;
                border-collapse: collapse;

                &:nth-child(2) {
                  font-size: 20px;
                }

                strong {
                  font-weight: 700;
                }
              }
            }
          }

          &::after {
            left: 82px;
            height: 250px;
            min-width: 920px;
          }
        }

      }

    }
  }

  .s05 {
    .inner {
      padding: 0 32px 50px;
    }
  }

  .s06 {
    .visualization {
      margin: 30px 0;
    }
  }
}



@media screen and (max-width: 767px) {
  .section {
    .inner {
      padding: 70px 24px;
      display: flex;
      flex-direction: column;

      .en-title {
        font-size: 22px;
      }

      .small-title {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: -2px;
      }

      .content {
        font-size: 12px;
        line-height: 1.8;
      }
    }
  }

  .head-img {
    min-width: 530px;    
  }

  .s01 {
    .inner {
      padding-top: 20px;

      .main-title {
        width: 100%;

        .main-text {

          .row {
            flex-direction: column-reverse;

            span {
              font-size: 10.4vw;
              text-align: center;
            }

            .main-emoji {
              width: fit-content;
              padding: 3px 15px;
              font-size: 4.5vw;
              letter-spacing: 1px;
              border: 1px solid var(--point);
            }
          }
        }

        img {
          position: absolute;
          transform: translate(-50%, -50%);

          &.tit-1 {
            top: 20%;
            left: 26%;
            width: 11vw;
          }

          &.tit-2 {
            top: 40%;
            left: 93%;
            width: 12vw;
          }

          &.tit-3 {
            top: 72%;
            left: 13%;
            width: 12vw;
          }

          &.tit-4 {
            top: 105%;
            left: 65%;
            width: 18vw;
            z-index: 2;
          }
        }

      }

      .main-sub {
        margin-top: 80px;

        .sub-desc {
          gap: 5px;

          img.star {
            width: 20px;
          }

          span {
            font-size: 10px;
            font-weight: 400;
            font-family: 'YdestreetB';
            letter-spacing: -1px;

            &.url {
              color: var(--point);
              font-weight: bold;
              font-size: 15px;
            }

            &.title {
              font-weight: 500;
              font-family: 'gothicA1';
              margin-bottom: 5px;
            }
          }

        }
      }
    }

  }

  .s02 {
    height: 550px;

    .inner {
      justify-content: flex-end;

      .over-desc {
        gap: 18px;
      }

      .back_bg {
        min-width: 500px;
      }
    }
  }

  .s03 {
    .inner {
      gap: 10px;

      .en-title {
        font-size: 50px;
      }

      .small-title {
        margin-bottom: 10px;
        color: var(--point);
      }

      img {
        margin-top: 10px;
        transform: translateX(10px);
      }
    }
  }

  .s04 {

    .inner {
      padding: 50px 0px; 

      .icon {
        width: 80px;
        margin: 15px 0;
      }

      .emo-list {
        grid-template-columns: repeat(2, 1fr);
        margin-top: 30px;
        row-gap: 30px;
        max-width: none;

        .emo-item {
          gap: 5px;

          .emo {
            font-size: 40px;
          }
          .en {
            font-size: 13px;
          }
          .ko {
            font-size: 11px;
          }
        }
      }

      .emo-table {
        margin: 40px 0 40px;
        padding: 0 24px 24px 0;

        .emo-count {
          width: calc(5% + 24px);
          min-width: 60px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          width: 95%;
          min-width: 800px;

          thead {
            height: 30px;

            th {
              font-size: 10px;
              letter-spacing: -0.5px;

              &:not(:last-child) {
                width: 105px;
              }

              &:first-child {
                width: 70px;
              }

              &:last-child {
                width: 70px;
              }

            }
          }

          tbody {

            tr {
              height: 50px;

              td {
                font-size: 10px;
                font-family: 'YdestreetB';
                border: none;
                border-collapse: collapse;

                &:nth-child(2) {
                  font-size: 17px;
                }
              }
            }
          }

          &::after {
            left: 60px;
            height: 250px;
            min-width: 800px;
          }
        }

      }

      .content {
        padding: 0 24px;
      }
    }
  }

  .s05 {
    .inner {
      display: flex;
      flex-direction: column;
      padding: 0 24px 0px;
      row-gap: 20px;

      figure {
        &:nth-child(1), &:nth-child(2) {
            width: 95%;
            max-width: 400px;
          }
        img {
          object-fit: cover;
        }
      }
    }
  }

  .s06 {
    .visualization {
      margin: 20px 0;
    }
  }

}


</style>
