
export default function ProfilContainer() {
    return (
      /* Parent container for the stacked components */
  
      <div className="profile-container">
      <div className="left-container">Bild</div>
      <div className="middleInfo-container">
        <div className="profileSquare">Namn</div>
        <div className="profileSquare">Roll</div>
        <div className="profileSquare">Avdelning</div>
        <div className="profileSquare">Arbetsplats</div>
        
        
      </div>
      <div className="right-container">Knappar</div>
    </div>

      
    );
  }