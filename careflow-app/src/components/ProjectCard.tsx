import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { BiComment, BiFileBlank } from "react-icons/bi";
import { GrTextAlignLeft } from "react-icons/gr";
import pImage from "../Images/p.png";
import pgImage from "../Images/pg.png";
import pgsImage from "../Images/pgs.png";
import pgsaImage from "../Images/pgsa.png";


export interface ProjectCardProps {
    title: string;
    date_created: any;
    place: string;
    tags: string[];
    phase: number;
    displayPhaseImage?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, date_created, place, tags, phase, displayPhaseImage}) => {
    const cardBodyStyle = {
        height: "180px",
       
    };

    const titleStyle = {
        fontFamily: "Avenir",
        fontWeight: "bold", 
        marginBottom: "0rem",
    };

    const formatDate = (timestamp: any) => {
        if (timestamp instanceof Date) {
            return timestamp.toLocaleDateString("sv-SE"); // Handle if it's already a Date
        }
        return timestamp.toDate().toLocaleDateString("sv-SE");
    };

    const getPhaseImage = (phase: number) => {
        switch (phase) {
            case 1:
                return <img src={pImage} />;
            case 2:
                return <img src={pgImage} />;
            case 3:
                return <img src={pgsImage} />;
            case 4:
                return <img src={pgsaImage} />;
        }
    };
   

    return (
        <Card>
            <Card.Body style={cardBodyStyle}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                    {tags.map((tag, index) => (
                        <Badge bg="dark" key={index} className="mr-2" style={{fontFamily: "Avenir",marginRight: "0.3rem", marginBottom: "0.4rem" }}>
                        {tag}
                        </Badge>
                    ))}
                       <Card.Title style={titleStyle}>{title}</Card.Title>
                        <Card.Text style ={{fontFamily: "Avenir",marginBottom:"1rem"}}>
                            {formatDate(date_created)}
                           
                        </Card.Text>
                        <Card.Text style = {{fontFamily: "Avenir", margin:"0rem"}}>
                        <span role="img" aria-label="Pin Emoji" style={{ fontSize: "15px" }}>
                            📍
                        </span>
                            {place}
                        </Card.Text>
                        <GrTextAlignLeft style ={{marginLeft: "0.5rem",marginRight: "0.6rem"}}/>
                        <BiFileBlank  style ={{marginRight: "0.6rem"}}/>
                        <BiComment style = {{marginRight: "11rem"}}/>
                        
                    </div>
                    {displayPhaseImage && (
                        <div style={{ position: "absolute", bottom: "1rem", right: "1rem" }}>
                            {getPhaseImage(phase)}
                        </div>
                    )}
                    <div>
                 
                        
                    </div>
                </div>
                <div>
                   
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProjectCard;
