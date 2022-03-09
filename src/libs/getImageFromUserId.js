import React from "react";
import image1 from "../../images/1.png";
import image2 from "../../images/2.png";
import image3 from "../../images/3.png";
import image4 from "../../images/4.png";
import image5 from "../../images/5.png";
import image6 from "../../images/6.png";
import image7 from "../../images/7.png";
import image8 from "../../images/8.png";
import image9 from "../../images/9.png";

export function getImagefromUserId({ userId }) {
    switch (userId) {
        case 1:
            return image1;
        case 2:
            return image2;
        case 3:
            return image3;
        case 4:
            return image4;
        case 5:
            return image5;

        case 6:
            return image6;

        case 7:
            return image7;

        case 8:
            return image8;

        case 9:
            return image9;

        default:
            return null;
    }
}
