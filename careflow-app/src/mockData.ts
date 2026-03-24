// @ts-nocheck

import { Timestamp } from "./mockFirebase";

const mockIteration = {
  selected_idea: "Standardiserat arbetssätt",
  plan: {
    notes: "Planera genomgång av rutiner",
    checklist: {
      checklist_items: ["Boka mötesrum", "Skicka kallelse"],
      checklist_done: [true, false],
      checklist_members: ["Projektledare", "Teamet"]
    },
    files: { file_descriptions: [], file_names: [], file_urls: [] }
  },
  do: {
    notes: "Genomförande påbörjat",
    idea: "Ny rutin v1",
    results: "Initial feedback insamlad",
    files: { file_descriptions: [], file_names: [], file_urls: [] }
  },
  study: {
    notes: "Analysera utfall",
    analysis: "Ser lovande ut",
    files: { file_descriptions: [], file_names: [], file_urls: [] }
  },
  act: {
    notes: "Beslut om permanent införande",
    choice: "Implementera",
    files: { file_descriptions: [], file_names: [], file_urls: [] }
  }
};

export const mockImprovementWorks = [
  {
    id: "1",
    title: "Minska väntetider på akuten",
    description: "Ett projekt för att korta ner ledtiderna genom nytt triagesystem.",
    phase: 2, // Planera
    place: "Akutmottagningen",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    tags: ["Akut", "Effektivitet"],
    date_created: Timestamp.now(),
    date_last_updated: Timestamp.now(),
    closed: false,
    goals: ["Minska väntetid med 20%"],
    ideas: ["Nytt triagesystem", "Fler sjuksköterskor"],
    ideas_done: [true, false],
    measure: ["Väntetid i minuter"],
    purpose: "Förbättra patientnöjdhet",
    project_leader: "user123",
    project_members: ["user456"],
    total_iterations: 1,
    all_iterations: [mockIteration]
  },
  {
    id: "2",
    title: "Digital incheckning i receptionen",
    description: "Införa självbetjäningsskärmar för snabbare incheckning.",
    phase: 3, // Göra
    place: "Receptionen",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    tags: ["Digitalisering", "Service"],
    date_created: Timestamp.now(),
    date_last_updated: Timestamp.now(),
    closed: false,
    goals: ["Korta köer vid receptionen"],
    ideas: ["Självbetjäningsskärmar"],
    ideas_done: [false],
    measure: ["Antal incheckningar per timme"],
    purpose: "Frigöra tid för receptionister",
    project_leader: "user123",
    project_members: [],
    total_iterations: 1,
    all_iterations: [mockIteration]
  },
  {
    id: "3",
    title: "Förbättrad rondrutin",
    description: "Optimera tiden för läkarrond på avdelning 4.",
    phase: 1, // Förslag
    place: "Avdelning 4",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    tags: ["Rutiner", "Teamarbete"],
    date_created: Timestamp.now(),
    date_last_updated: Timestamp.now(),
    closed: false,
    goals: ["Frigöra 30 minuter per dag"],
    ideas: ["Checklista för rond", "Tidigare starttid"],
    ideas_done: [false, false],
    measure: ["Tid spenderad på rond"],
    purpose: "Bättre resursutnyttjande",
    project_leader: "user123",
    project_members: [],
    total_iterations: 1,
    all_iterations: [mockIteration]
  },
  {
    id: "4",
    title: "Patientens röst i vården",
    description: "Ett initiativ för att öka patientinvolvering.",
    phase: 4, // Studera
    place: "Hela kliniken",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    tags: ["Patientfokus", "Kvalitet"],
    date_created: Timestamp.now(),
    date_last_updated: Timestamp.now(),
    closed: false,
    goals: ["Öka Nöjd-Patient-Index"],
    ideas: ["Patientråd", "Digitala enkäter"],
    ideas_done: [true, true],
    measure: ["NPI-värde"],
    purpose: "Vård på patientens villkor",
    project_leader: "user123",
    project_members: ["user456"],
    total_iterations: 1,
    all_iterations: [mockIteration]
  },
  {
    id: "5",
    title: "E-recept uppföljning",
    description: "Säkerställa att patienter hämtar ut sin medicin.",
    phase: 5, // Agera
    place: "Primärvården",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    tags: ["Digitalisering", "Säkerhet"],
    date_created: Timestamp.now(),
    date_last_updated: Timestamp.now(),
    closed: false,
    goals: ["Minska missade uthämtningar"],
    ideas: ["SMS-påminnelse"],
    ideas_done: [true],
    measure: ["Andel uthämtade recept"],
    purpose: "Ökad följsamhet till behandling",
    project_leader: "user123",
    project_members: [],
    total_iterations: 1,
    all_iterations: [mockIteration]
  },
  {
    id: "6",
    title: "Bättre kommunikation med anhöriga",
    description: "Utveckla en app för statusuppdateringar till anhöriga.",
    phase: 1, // Förslag
    place: "Intensivvården",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    tags: ["Kommunikation", "Service"],
    date_created: Timestamp.now(),
    date_last_updated: Timestamp.now(),
    closed: false,
    goals: ["Öka anhörignöjdhet"],
    ideas: ["Mobilapp för anhöriga"],
    ideas_done: [false],
    measure: ["Anhörig-enkäter"],
    purpose: "Minska stress för anhöriga",
    project_leader: "user456",
    project_members: ["user123"],
    total_iterations: 0,
    all_iterations: []
  },
  {
    id: "7",
    title: "Minska matsvinn på avdelningen",
    description: "Se över beställningsrutiner för patientmat.",
    phase: 2, // Planera
    place: "Avdelning 2",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    tags: ["Miljö", "Effektivitet"],
    date_created: Timestamp.now(),
    date_last_updated: Timestamp.now(),
    closed: false,
    goals: ["Minska svinn med 15%"],
    ideas: ["Nytt beställningssystem"],
    ideas_done: [false],
    measure: ["Kilo matsvinn per vecka"],
    purpose: "Bättre resursanvändning",
    project_leader: "user123",
    project_members: [],
    total_iterations: 1,
    all_iterations: [mockIteration]
  },
  {
    id: "8",
    title: "Säker läkemedelshantering",
    description: "Dubbelkontroll av högrisk-läkemedel.",
    phase: 3, // Göra
    place: "Hela sjukhuset",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    tags: ["Säkerhet", "Kvalitet"],
    date_created: Timestamp.now(),
    date_last_updated: Timestamp.now(),
    closed: false,
    goals: ["Noll avvikelser i medicinering"],
    ideas: ["Checklista för dubbelkontroll"],
    ideas_done: [true],
    measure: ["Antal rapporterade avvikelser"],
    purpose: "Hög patientsäkerhet",
    project_leader: "user456",
    project_members: [],
    total_iterations: 1,
    all_iterations: [mockIteration]
  },
  {
    id: "9",
    title: "Rehab-träning via video",
    description: "Erbjuda sjukgymnastik på distans.",
    phase: 4, // Studera
    place: "Fysioterapin",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    tags: ["Digitalisering", "Tillgänglighet"],
    date_created: Timestamp.now(),
    date_last_updated: Timestamp.now(),
    closed: false,
    goals: ["Fler genomförda pass"],
    ideas: ["Videomötes-plattform"],
    ideas_done: [true],
    measure: ["Antal besök per vecka"],
    purpose: "Ökad tillgänglighet för patienter",
    project_leader: "user123",
    project_members: ["user456"],
    total_iterations: 1,
    all_iterations: [mockIteration]
  },
  {
    id: "10",
    title: "Smidig utskrivning",
    description: "Samordning av hemtjänst vid utskrivning.",
    phase: 5, // Agera
    place: "Avdelning 5",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    tags: ["Samordning", "Flöde"],
    date_created: Timestamp.now(),
    date_last_updated: Timestamp.now(),
    closed: false,
    goals: ["Minska dagar på sjukhus efter klarbehandling"],
    ideas: ["Gemensam portal med kommunen"],
    ideas_done: [true],
    measure: ["Väntedagar efter klarbehandling"],
    purpose: "Effektivare utskrivningsprocess",
    project_leader: "user456",
    project_members: [],
    total_iterations: 1,
    all_iterations: [mockIteration]
  }
];

export const mockTags = ["Akut", "Effektivitet", "Digitalisering", "Patientfokus", "Rutiner", "Kvalitet", "Säkerhet", "Kommunikation", "Service", "Miljö", "Tillgänglighet", "Samordning", "Flöde"];
export const mockUsers = [
  {
    id: "user123",
    hsaID: "user123",
    first_name: "Anna",
    sur_name: "Andersson",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    admin: true,
    email: "anna@example.com",
    phone_number: "070-1234567",
    place: "Västerås",
    profession: "Läkare"
  },
  {
    id: "user456",
    hsaID: "user456",
    first_name: "Bengt",
    sur_name: "Berglund",
    clinic: "Medicinkliniken",
    centrum: "Medicinskt Centrum",
    admin: false,
    email: "bengt@example.com",
    phone_number: "070-7654321",
    place: "Västerås",
    profession: "Sjuksköterska"
  }
];
