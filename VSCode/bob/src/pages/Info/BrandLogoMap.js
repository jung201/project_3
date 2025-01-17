import HDOLogo from "../../static/images/stationLogo/HDO.PNG";
import SOLLogo from "../../static/images/stationLogo/SOL.PNG";
import SKELogo from "../../static/images/stationLogo/SKE.png";
import GSCLogo from "../../static/images/stationLogo/GSC.PNG";
import RTXLogo from "../../static/images/stationLogo/RTX.PNG";
import DefaultLogo from "../../static/images/stationLogo/default_logo.PNG";

const brandLogoMap = {
    HDO: HDOLogo,
    SOL: SOLLogo,
    SKE: SKELogo,
    GSC: GSCLogo,
    RTX: RTXLogo,
};

export const getBrandLogo = (brand) => {
    return brandLogoMap[brand] || DefaultLogo;
};
