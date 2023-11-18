import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpPopover from "./HelpPopover";
import ProjectCard from "./ProjectCard";
import { useAuth0 } from '@auth0/auth0-react';
import {
    ImprovementWork,
    // getUserImprovementWorks,
    // filterImprovementWorks,
    // findUserImprovementWorks,
    findTagOptions
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
interface FilterState {
    filter: string;
    tagFilter: string;
    closed: boolean;
}

function ProjectsSection({ userInfo, allImprovementWorks }: ProjectsSectionProps) {

    // const [allImprovementWorks, setImprovementWorks] = useState<ImprovementWork[] >(improvementWorks);
    const [displayedImprovementWorks, setDisplayedImprovementWorks] = useState<ImprovementWork[]>([]);
    const [filtered1ImprovementWorks, setfiltered1ImprovementWorks] = useState<ImprovementWork[]>([]);
    const [tagOptions, setTagOptions] = useState<string[]>([]);
    const [chosenFilter1, setFilter1] = useState<string>("user");
    const [chosenFilter2, setFilter2] = useState<string>("all_tags");
    const [filterState, setFilterState] = useState<FilterState>({ filter: "user", tagFilter: "all_tags", closed: false });

    // använder denna istället för en state-variabel pga en ändring av statevariabel görs
    // asynchront, det valda filtret hinner inte uppdateras innan filtreringen om man har en state-variabel.
    // let filterState: FilterState = {
    //     filter: "user",
    //     tagFilter: "all_tags",
    //     closed: false
    // }

    //allmän filtrering som kollar om ett aktuellt projekt ska filtreras bort eller inte.
    function include(improvementWork: ImprovementWork, filter: FilterState, userInfo: UserInfoType) {
        // if we are searching for closed ImpWorks and the focal ImpWork is open
        // OR if we are searching for open ImpWorks and the focal ImpWork is closed,
        // don't include it.
        if ((filter.closed && !improvementWork.closed) || (!filter.closed && improvementWork.closed)) {
            return false;
        }

        // if we are filtering users ImpWorks and the user neither a member nor a leader,
        // don't include it
        if (filter.filter == "user" && !(improvementWork.project_leader == userInfo.hsaID || improvementWork.project_members.includes(userInfo.hsaID))) {
            return false;
            // if we are filtering on the user's clinic and the focal ImpWork is not in the user's clinic,
            // don't include it
        } else if (filter.filter == "clinic" && improvementWork.clinic != userInfo.clinic) {
            return false
        }

        // if we are filtering on specific tags, if filtering on specific tags, check if
        // focal ImpWork has the tag. If not, don't include it.
        if (filter.tagFilter !== "all_tags") {
            if (!improvementWork.tags.includes(filter.tagFilter)) {
                return false
            }
        }

        return true;
    }

    // denna sköter hela filtreringen. Man går igenom alla projekt och kollar vilka som ska
    // filtreras bort genom att anropa include
    function filterImprovementWorks(orgImprovementWorks: ImprovementWork[], filter: FilterState) {
        console.log(filter)
        let filteredImprovementWorks: ImprovementWork[] = []
        orgImprovementWorks.forEach((improvementWork) => {
            // console.log(improvementWork)
            if (include(improvementWork, filter, userInfo)) {
                filteredImprovementWorks.push(improvementWork)
            }
        })
        return filteredImprovementWorks
    }

    // denna kollar om vi ska filtrera på användaren eller kliniken
    const handleFilter = async (event: any) => {
        if (event.target.value == "user") {
            // gör så att vi filtrerar på användaren
            setFilterState(prev => ({ ...prev, filter: "user" })); //FUNKAR EJ pga tar tid att uppdatera state-variabel
        }
        else if (event.target.value == "clinic") {
            // gör så att vi filtrerar på kliniken
            setFilterState(prev => ({ ...prev, filter: "clinic" })); //FUNKAR EJ pga tar tid att uppdatera state-variabel
        }
        // filtreringen anropas här.
        const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(allImprovementWorks, filterState)
        setDisplayedImprovementWorks(filteredImprovementWorks)
    };

    // denna uppdaterar vilken tag som ska filtreras på.
    const handleTags = (event: any) => {
        setFilterState(prev => ({ ...prev, tagFilter: event.target.value })); //FUNKAR EJ pga tar tid att uppdatera state-variabel
        // efter uppdateringen görs filtreringen
        const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(allImprovementWorks, filterState)
        setDisplayedImprovementWorks(filteredImprovementWorks)
    }

    //ser till så att vi i början visar användarens arbeten vid första rendering.
    // hämtar dock taggar från ALLA projekt vilket inte är det vi bestämde, så det behöver ändras
    // så att det blir så som vi sa.
    useEffect(() => {
        const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(allImprovementWorks, filterState)
        setDisplayedImprovementWorks(filteredImprovementWorks)
        const tags = findTagOptions(allImprovementWorks);
        setTagOptions(tags);

    }, []);





    const projectsSectionStyle = {
        background: 'rgba(255, 255, 255, 0.70)',
        width: "100%",
        height: "20rem",
        borderRadius: "10px",
        margin: "0px",
        marginBottom: "20px", // Added this line
        padding: "10px",
        overflowX: "auto" as "auto",
        boxShadow: '0px 0px 10px rgba(100, 100, 100, 0.2)',
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
        paddingBottom: "1rem"
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
                <h1 className="mt-2 ml-2" style={titleStyle}>Pågående förbättringsarbeten</h1>
                <div className="ml-2 mt-2">
                    <select className="form-select" aria-label="Filtrera" onChange={handleFilter}>
                        <option selected value="user">Visa mina</option>
                        <option value="clinic">Visa klinikens</option>
                    </select>
                </div>
                <div className="ml-2 mt-2">
                    <select className="form-select" aria-label="Filtrera" onChange={handleTags}>
                        <option selected value="all_tags">Visa alla taggar</option>
                        {
                            tagOptions.map((tag) => (
                                <option key={tag} value={tag}> {tag}</option>
                            ))
                        }

                    </select>
                </div>
                <div className="mt-3 ml-2">
                    <HelpPopover content="Här kommer det vara en informationsruta som hjälper användaren att navigera bland pågående projekt" />
                </div>
            </div>

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
                                displayPhaseImage={true}
                            />
                        </div>
                    ))
                ) : (
                    null
                )}
            </div>
        </div>
    );
}

export default ProjectsSection;