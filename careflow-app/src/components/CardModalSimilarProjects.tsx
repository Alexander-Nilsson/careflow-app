import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { UserFilterState, ImprovementWork, filterForUser, findTagOptions } from "../ImprovementWorkLib";
import ProjectsSection from "./ProjectsSection";
import ProjectCard from "./ProjectCard";


const whiteContainerStyle = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E7E7",
  paddingTop: "10px",
  paddingBottom: "10px",
  paddingLeft: "15px",
  borderRadius: "10px",
};

const formGroupStyle = {
  backgroundColor: "#F4F4F4",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "10px",
};

const projectsContainerStyle = {
  display: "flex" as "flex",
  flexDirection: "row" as "row",
  maxWidth: "100%", // Set a maximum width to prevent overflowing
  overflowX: "auto" as "auto",
  paddingBottom: "1rem",
};

interface similarImprovementWorksProps {
  tags: Array<string>;
  improvementWorkList: ImprovementWork[];
}

function CardModalSimilarProjects({ tags, improvementWorkList }: similarImprovementWorksProps) {
//   const [displayedImprovementWorks, setDisplayedImprovementWorks] = useState<ImprovementWork[]>([]);

  const [filterState, setFilterState] = useState<UserFilterState>({
    includeUser: false,
    includeClinic: false,
    includeCentrum: false,
    tagFilter: tags[0],
    placeFilter: "all_places",
    closed: false
});


  let randomUserdata = {
    hsaID: "",
    admin: false,
    centrum: "",
    clinic: "",
    email: "",
    first_name: "",
    phone_number: "",
    place: "",
    profession: "",
    sur_name: ""
  };
  const displayedImprovementWorks: ImprovementWork[] = filterForUser(improvementWorkList, filterState, randomUserdata, "date_created");

  return (
    <>
      <Form.Group style={formGroupStyle}>
        <Form.Label>
          <b>Liknande förbättringsarbeten</b>
        </Form.Label>
        <div style={whiteContainerStyle}>
          <div style={projectsContainerStyle}>
          {displayedImprovementWorks != null ? (
                    displayedImprovementWorks.map((improvementWork, index) => (
                        <div className="col-md-6 col-lg-3" style={{ marginRight: "1%" }} key={index}>
                            <ProjectCard
                                title={improvementWork.title}
                                date_created={improvementWork.date_created}
                                place={improvementWork.place}
                                tags={improvementWork.tags}
                                phase={improvementWork.phase}
                                displayPhaseImage={false}
                                improvementWork={improvementWork}
                                isAdmin={randomUserdata.admin}
                                improvementWorkList={improvementWorkList}
                            />
                        </div>
                    ))
                ) : (
                    null
                )}
          </div>
        </div>
      </Form.Group>
    </>
  );
}

export default CardModalSimilarProjects;
