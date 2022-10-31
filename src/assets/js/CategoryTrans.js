export const CategoryTrans = (category) => {
    let korean = "";
    if (category == "anger") {
        korean = "분노";
    } else if (category == "fear") {
        korean = "공포";
    } else if (category == "sadness") {
        korean = "슬픔";
    } else if (category == "disgust") {
        korean = "혐오";
    } else if (category == "surprise") {
        korean = "불안";
    } else if (category == "anticipation") {
        korean = "기대";
    } else if (category == "trust") {
        korean = "신뢰";
    } else if (category == "joy") {
        korean = "기쁨";
    }

    return korean;
}