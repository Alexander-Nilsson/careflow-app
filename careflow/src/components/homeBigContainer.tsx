
export default function HomeBigContainer() {
    return (
      /* Parent container for the stacked components */
  
      <div className="big-container">
      <div className="top-container">Titel</div>
      <div className="middle-container">
        <div className="square">Kort 1</div>
        <div className="square">Kort 2</div>
        <div className="square">Kort 3</div>
        <div className="square">Kort 4</div>
      </div>
      <div className="bottom-container">Progress</div>
    </div>

      
    );
  }