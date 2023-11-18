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

interface FilterState {
    filter: string;
    tagFilter: string;
    closed: boolean;
}

// type ImprovementWorksProps = {
//     improvementWorks: ImprovementWork[] | null;
// };

function ProjectsSection({ userInfo, allImprovementWorks }: ProjectsSectionProps) {

    // const [allImprovementWorks, setImprovementWorks] = useState<ImprovementWork[] >(improvementWorks);
    const [displayedImprovementWorks, setDisplayedImprovementWorks] = useState<ImprovementWork[]>([]);
    const [filtered1ImprovementWorks, setfiltered1ImprovementWorks] = useState<ImprovementWork[]>([]);
    const [tagOptions, setTagOptions] = useState<string[]>([]);
    const [chosenFilter1, setFilter1] = useState<string>("user");
    const [chosenFilter2, setFilter2] = useState<string>("all_tags");
    // const [filterState, setFilterState] = useState<FilterState>({ filter: "user", tagFilter: "all_tags", closed: false });

    let filterState: FilterState = {
        filter: "user",
        tagFilter: "all_tags",
        closed: false
    }
    // const filteredImprovementWorks = allImprovementWorks.filter((improvementWork) => {
    //     // Check if improvementWork is assigned to the selected user (if any)
    //     if (filterState.filter == "user" && (improvementWork.project_leader !== userInfo.hsaID || !improvementWork.project_members.includes(userInfo.hsaID))) {
    //       return false;
    //     }

    //     // Check if improvementWork belongs to the selected clinic (if any)
    //     if (filterState.filter == "clinic"  && improvementWork.clinic !== userInfo.clinic) {
    //       return false;
    //     }

    //     // Check if improvementWork has the selected tag (if any)
    //     if (
    //       filterState.tagFilter &&
    //       !improvementWork.tags.includes(filterState.tagFilter.toLowerCase())
    //     ) {
    //       return false;
    //     }

    //     return true;
    //   });





    // function filter(filter: string){
    //     let filteredImprovementWorks: ImprovementWork[] = []
    //     if (filter == "user") {
    //         // filteredImprovementWorks = filterImprovementWorks(allImprovementWorks, filter, userInfo.hsaID, false)
    //     }
    //     else if (filter == "clinic") {
    //         // filteredImprovementWorks= filterImprovementWorks(allImprovementWorks, filter, userInfo.clinic, false)
    //     }
    //     setfiltered1ImprovementWorks(filteredImprovementWorks)
    //     setDisplayedImprovementWorks(filteredImprovementWorks)
    //     setFilter1(filter);
    // }

    // function filterTags(filter:string) {
    //     if (filter == "all_tags"){
    //         // filter(chosenFilter1)
    //     }
    //     else {
    //         let chosenImprovementWorks: ImprovementWork[] = [];
    //         // if (chosenFilter1 == "user"){
    //         //     chosenImprovementWorks= filterImprovementWorks(allImprovementWorks, "user", userInfo.hsaID, false)
    //         // } else if (chosenFilter1 =="clinic"){
    //         //     chosenImprovementWorks = filterImprovementWorks(allImprovementWorks, "clinic", userInfo.clinic, false)
    //         // }
    //         // const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(filtered1ImprovementWorks, "tags", filter, false)
    //         // setDisplayedImprovementWorks(filteredImprovementWorks);
    //     }
    //     setFilter2(filter)
    // }

    const handleFilter = async (event: any) => {
        
        // filter(event.target.value)
        // filterTags(chosenFilter2)
        // filter2
        // console.log(event.target.value)
        if (event.target.value == "user") {
            
            
            // console.log("user!!")
            // setFilterState((prev) => ({ ...prev, filter: "user" }));
            filterState = {
                filter: "user",
                tagFilter: filterState.tagFilter,
                closed: filterState.closed
            }
            // setFilter("user");
            // const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(allImprovementWorks, event.target.value, userInfo.hsaID, false)
            // setDisplayedImprovementWorks(filteredImprovementWorks)
        }
        else if (event.target.value == "clinic") {
            filterState = {
                filter: "clinic",
                tagFilter: filterState.tagFilter,
                closed: filterState.closed
            }
            // console.log("clinic!!")
            // setFilterState((prev) => ({ ...prev, filter: "clinic" }));
            // setFilter("clinic");
            // console.log("filtrerar på klinik" && userInfo.clinic)
            // const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(allImprovementWorks, event.target.value, userInfo.clinic, false)
            // setDisplayedImprovementWorks(filteredImprovementWorks)
        }
        console.log(filterState.filter)
        const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(allImprovementWorks, filterState)
        // console.log("filtrerar på: " + event.target.value)
        // console.log(filteredImprovementWorks)
        setDisplayedImprovementWorks(filteredImprovementWorks)
        //filter2
    };

    const handleTags = (event: any) => {
        filterState = {
            filter: filterState.filter,
            tagFilter: event.target.value,
            closed: filterState.closed
        }
        // setFilterState((prev) => ({ ...prev, tagFilter: event.target.value }));
        const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(allImprovementWorks, filterState)
        setDisplayedImprovementWorks(filteredImprovementWorks)
        // console.log(filterImprovementWorks)
        // filter(chosenFilter1)
        // filterTags(event.target.value)
        //filter1
        // if (event.target.value == "all_tags"){

        // }
        // else {
        //     let chosenImprovementWorks: ImprovementWork[] = [];
        //     if (chosenFilter1 == "user"){
        //         chosenImprovementWorks= filterImprovementWorks(allImprovementWorks, "user", userInfo.hsaID, false)
        //     } else if (chosenFilter1 =="clinic"){
        //         chosenImprovementWorks = filterImprovementWorks(allImprovementWorks, "clinic", userInfo.clinic, false)
        //     }
        //     const filteredImprovementWorks: ImprovementWork[] = filterImprovementWorks(chosenImprovementWorks, "tags", event.target.value, false)
        //     setDisplayedImprovementWorks(filteredImprovementWorks);
        // }
    }

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
        } 
        else if (filter.filter == "clinic" && improvementWork.clinic != userInfo.clinic) {
            return false
        }

        if (!improvementWork.tags.includes(filter.tagFilter)) {
            return false
        }

        return true;
    }

    function filterImprovementWorks(orgImprovementWorks: ImprovementWork[], filter: FilterState) {
        let filteredImprovementWorks: ImprovementWork[] = []
        orgImprovementWorks.forEach((improvementWork) => {
            // console.log(improvementWork)
            if (include(improvementWork, filter, userInfo)) {
                filteredImprovementWorks.push(improvementWork)
            }
        })
        return filteredImprovementWorks
    }

    useEffect(() => {
        const filtered1ImprovementWorks: ImprovementWork[] = filterImprovementWorks(allImprovementWorks, filterState)
        setDisplayedImprovementWorks(filtered1ImprovementWorks)
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