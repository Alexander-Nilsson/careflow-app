import IdeContainer from "../components/IdeContainer";
import ProfilContainer from "../components/ProfilContainer";
import ProgressContainer from "../components/ProgressContainer";
import HomeBigContainer from "../components/homeBigContainer"; 

export default function Arkiv() {
  return (
    <div className="ArkivContainer">
        <ProfilContainer/>
      <HomeBigContainer /> 
      <div className="IdeProgressContainer">
      <IdeContainer/>
      <ProgressContainer />
      </div>
      <HomeBigContainer /> 
    </div>
  );
}
