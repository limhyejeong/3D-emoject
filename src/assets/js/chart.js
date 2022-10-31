import Chart from "chart.js/auto";

export function drawChart(data) {
    const context = document.querySelector("#outputChart").getContext("2d");
    const outputChart = new Chart(context, {
        type: "radar", // 차트의 형태
        data: {
            // 차트에 들어갈 데이터
            labels: [
                //x 축
                "분노",
                "공포",
                "슬픔",
                "혐오",
                "놀람",
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
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scale: {
                ticks: {
                    maxTicksLimit: 4,
                    display: false
                }
            },
            scales: {
                r: {
                    ticks: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}