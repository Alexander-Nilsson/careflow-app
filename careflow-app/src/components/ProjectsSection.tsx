import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpPopover from "./HelpPopover";
import ProjectCard from "./ProjectCard";
import {
  FilterState,
  ImprovementWork,
  filterImprovementWorks,
  findTagOptions,
} from "../ImprovementWorkLib";
import { UserInfoType } from "./Start";

type ProjectsSectionProps = {
  userInfo: UserInfoType;
  allImprovementWorks: ImprovementWork[];
};

// denna används istället för att ha olika variabler för olika filter.
// nu samlas alla filter d.v.s. om vi ska visa användarens eller klinikens (filter),
// vilken tag som ska visas,
// samt om vi vill ha öppna eller stängda arbeten.

function ProjectsSection({
  userInfo,
  allImprovementWorks,
}: ProjectsSectionProps) {
  const [improvementWorks, setImprovementWorks] = useState<ImprovementWork[]>(
    []
  );
  const [displayedImprovementWorks, setDisplayedImprovementWorks] = useState<
    ImprovementWork[]
  >([]);
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [filterState, setFilterState] = useState<FilterState>({
    includeUser: true,
    includeClinic: true,
    tagFilter: "all_tags",
    closed: false,
  });

  // denna uppdaterar värdet på filterState baserat på det användaren klickade på
  const handleFilter = async (event: any) => {
    if (event.target.value == "user") {
      setFilterState((prev) => ({ ...prev, includeUser: true }));
    } else if (event.target.value == "clinic") {
      setFilterState((prev) => ({ ...prev, includeClinic: true }));
    }
  };

  // denna uppdaterar vilken tag som ska filtreras på.
  const handleTags = (event: any) => {
    setFilterState((prev) => ({ ...prev, tagFilter: event.target.value })); //när denna är färdiguppdaterad körs alltså useEffect
  };

  //Denna useEffect uppdaterar alla arbeten som ska visas efter att filterState har uppdaterats
  // d.v.s. när man har klickat på ett filter
  useEffect(() => {
    const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(
      improvementWorks,
      filterState,
      userInfo
    );
    setDisplayedImprovementWorks(filteredImprovementWorks);
  }, [filterState]);

  // denna useEffect ser till att man hämtar taggar endast en gång, eftersom den inte har en hook som den ovan har.
  // OBS den hämtar ALLA taggar och inte bara de som finns i användarens/klinikens projekt så det behöver ändras
  // så att det funkar som vi sa.
  useEffect(() => {
    const improvementWorks = filterImprovementWorks(
      allImprovementWorks,
      filterState,
      userInfo
    );
    const tags = findTagOptions(improvementWorks);
    setImprovementWorks(improvementWorks);
    setTagOptions(tags);
    setFilterState((prev) => ({ ...prev, includeClinic: false }));
  }, []);

  const projectsSectionStyle = {
    background: "rgba(255, 255, 255, 0.70)",
    width: "100%",
    height: "20rem",
    borderRadius: "10px",
    margin: "0px",
    marginBottom: "20px", // Added this line
    padding: "10px",
    overflowX: "auto" as "auto",
    boxShadow: "0px 0px 10px rgba(100, 100, 100, 0.2)",
  };

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

  const projectsContainerStyle = {
    display: "flex" as "flex",
    flexDirection: "row" as "row",
    maxWidth: "100%", // Set a maximum width to prevent overflowing
    overflowX: "auto" as "auto",
    paddingBottom: "1rem",
  };

  const titleStyle = {
    fontFamily: "Avenir",
    marginLeft: "10px",
    marginTop: "10px",
    marginBottom: "1.5rem",
    fontSize: "2rem",
  };

  return (
    <div style={projectsSectionStyle}>
      <style>{scrollBarStyles}</style>
      <div className="d-flex">
        <h1 className="mt-2 ml-2" style={titleStyle}>
          Pågående förbättringsarbeten
        </h1>
        <div className="ml-2 mt-2">
          <select
            className="form-select"
            aria-label="Filtrera"
            onChange={handleFilter}
            style={{ cursor: "pointer" }}
          >
            <option selected value="user">
              Visa mina
            </option>
            <option value="clinic">Visa klinikens</option>
          </select>
        </div>
        <div className="ml-2 mt-2">
          <select
            className="form-select"
            aria-label="Filtrera"
            onChange={handleTags}
            style={{ cursor: "pointer" }}
          >
            <option selected value="all_tags">
              Visa alla taggar
            </option>
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {" "}
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 ml-2">
          <HelpPopover content="Här kommer det vara en informationsruta som hjälper användaren att navigera bland pågående projekt" />
        </div>
      </div>

      <div style={projectsContainerStyle}>
        {displayedImprovementWorks != null
          ? displayedImprovementWorks.map((improvementWork, index) => (
              <div
                className="col-md-6 col-lg-3"
                style={{ marginRight: "1%" }}
                key={index}
              >
                <ProjectCard
                  title={improvementWork.title}
                  date_created={improvementWork.date_created}
                  place={improvementWork.place}
                  tags={improvementWork.tags}
                  phase={improvementWork.phase}
                  displayPhaseImage={true}
                  improvementWork={improvementWork}
                  isAdmin={userInfo.admin}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default ProjectsSection;
