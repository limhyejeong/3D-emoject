import Chart from "chart.js/auto";

export function radarChart(categoryData) {
    const context = document.querySelector('#outputRadarChart').getContext("2d");

    var gradientBlue = context.createLinearGradient(0, 0, 0, 300);
    gradientBlue.addColorStop(0, 'rgba(255, 122, 0, 0.8)');
    gradientBlue.addColorStop(1, 'rgba(255, 208, 0, 0.8)');


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
                        categoryData.anger,
                        categoryData.fear,
                        categoryData.sadness,
                        categoryData.disgust,
                        categoryData.surprise,
                        categoryData.anticipation,
                        categoryData.trust,
                        categoryData.joy,
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
                },
                tooltip: {
                    enabled: false // <-- this option disables tooltips
                }
            },
        }
    });
}