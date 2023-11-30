import DisplayAllProjects from "./DisplayAllProjects";
import "../styles/DisplayAllProjects.css";
import HelpPopover from "./HelpPopover";
import '../font/font.css';
import TitleBox from "./TitleBox";

function Archive() {
  const startStyle = {
    backgroundColor: "white",
  };

  const contentStyle = {
    marginTop: '20px',
    width: "90%",
    height: "60%",
    marginLeft: "5%", // 5% margin on the left
    marginRight: "5%", // 5% margin on the right
  }

  const scrollBarStyles = `
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background: #A9A9A9;
        border-radius: 4px;  
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px; 
    }
`;

  return (
    <div>
      <img
        className="background-gradient"
        alt=""
        src="./background-gradient.png"
      />
      <style>{scrollBarStyles}</style>
      {/* <div style={contentStyle}>
        <TitleBox
          title={"Alla förbättringsarbeten"}
          description="Här kan du bläddra bland pågående projekt och se vilken status de har. \n \n
        Du kan välja vilken avdelning, vårdenhet eller region som projekten ska beröra. Det finns även ett flertal filter att välja bland, som gör att du kan smalna av sökningen och göra resultaten relevanta för vad du söker. \n \n I fritext-rutan kan du skriva in sökord och få resultat relaterade till dem. 
        Projekten dyker upp som kort där en översikt med den viktigaste informationen visas. \n \n Det finns fem olika faser som ett projekt kan befinna sig i och korten flyttas mellan dem i takt med att projektet fortskrider."
        />
        <div className="description" style={{ marginLeft: "2vw" }}>
          <p style={{ fontFamily: 'Avenir', fontStyle: 'italic', fontSize: "70%", fontWeight: "normal" }}>
            Här kan du se alla pågående och avslutade förbättringsarbeten inom regionen.
            <br />
            Använd sök- och filterfunktionerna för att leta efter förbättringsarbeten som du är intresserad av.
          </p>
        </div>
        {/*}  <h1 className = "blue-label">
              Alla förbättringsarbeten 
              <div style={{display: "inline-block", marginLeft: "10px"}}>
                <HelpPopover content="'Alla förbättringsarbeten' är en sida där du kan se avslutade förbättringsarbeten."/>
                </div>
            </h1>
*/}
        <DisplayAllProjects />
      {/* </div> */} 
    </div>
  );
}

export default Archive;