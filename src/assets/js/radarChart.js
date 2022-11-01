import Chart from "chart.js/auto";

export function radarChart(data) {
    const context = document.querySelector('#outputRadarChart').getContext("2d");

    var gradientBlue = context.createLinearGradient(0, 0, 0, 200);
    gradientBlue.addColorStop(0, 'rgba(70, 70, 200, 1)');
    gradientBlue.addColorStop(1, 'rgba(130, 170, 255, 1)');


    const chart = new Chart(context, {
        type: "radar", // 차트의 형태
        data: {
            // 차트에 들어갈 데이터
            labels: [
                //x 축
                "분노",
                "공포",
                "슬픔",
                "혐오",
                "불안",
                "기대",
                "신뢰",
                "기쁨",
            ],
            datasets: [
                {
                    //데이터
                    label: "홍길동", //차트 제목
                    fill: true, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
                    data: [
                        data.anger,
                        data.fear,
                        data.sadness,
                        data.disgust,
                        data.surprise,
                        data.anticipation,
                        data.trust,
                        data.joy,
                    ],
                    backgroundColor: gradientBlue,
                    borderColor: "transparent",
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    pointHoverBackgroundColor: "transparent",
                    pointHoverBorderColor: "transparent",
                    pointHitRadius: 50,
                },
            ],
        },
        options: {
            responsive: false,
            scale: {
                ticks: {
                    maxTicksLimit: 4,
                    display: false,
                },

            },
            scales: {
                r: {
                    ticks: {
                        display: false,
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                        }
                    },
                    grid: {
                        color: "#777",
                    },
                },
            },
            plugins: {
                legend: {
                    display: false
                }
            },
        }
    });
}