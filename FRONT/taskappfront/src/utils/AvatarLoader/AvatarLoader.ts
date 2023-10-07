import userImage1 from "../../assets/images/peeps/peep1.svg";
import userImage2 from "../../assets/images/peeps/peep2.svg";
import userImage3 from "../../assets/images/peeps/peep3.svg";
import userImage4 from "../../assets/images/peeps/peep4.svg";
import userImage5 from "../../assets/images/peeps/peep5.svg";
import userImage6 from "../../assets/images/peeps/peep6.svg";
import userImage7 from "../../assets/images/peeps/peep7.svg";
import userImage8 from "../../assets/images/peeps/peep8.svg";
import userImage9 from "../../assets/images/peeps/peep9.svg";
import userImage10 from "../../assets/images/peeps/peep10.svg";
import userImage11 from "../../assets/images/peeps/peep11.svg";
import userImage12 from "../../assets/images/peeps/peep12.svg";
import userImage13 from "../../assets/images/peeps/peep13.svg";
import userImage14 from "../../assets/images/peeps/peep14.svg";

export const getUserAvatar = (storageValue: string) => {
  switch (storageValue) {
    case "1":
        return userImage1;
    case "2":
        return userImage2;
    case "3":
        return userImage3;
    case "4":
        return userImage4;
    case "5":
        return userImage5;
    case "6":
        return userImage6;
    case "7":
        return userImage7;
    case "8":
        return userImage8;
    case "9":
        return userImage9;
    case "10":
        return userImage10;
    case "11":
        return userImage11;
    case "12":
        return userImage12;
    case "13":
        return userImage13;
    case "14":
        return userImage14;
    default:
        return userImage1;
  }
};
