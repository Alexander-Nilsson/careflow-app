import { userIDname, userInfo } from "./CreateNewProject";

export function findUserIds(members: string[], usersClassArray: userIDname[]) {
  let userIDs = [];
  for (let i = 0; i < members.length; i++) {
    for (let j = 0; j < usersClassArray.length; j++) {
      if (members[i] == usersClassArray[j].sur_name) {
        userIDs.push(usersClassArray[j].id);
      }
    }
  }
  return userIDs;
}

export function findUserInfo(
  members: string[],
  usersInfoArray: userInfo[]
): [string[], string[]] {
  let userCentrums = [];
  let userClinics = [];
  for (let i = 0; i < members.length; i++) {
    for (let j = 0; j < usersInfoArray.length; j++) {
      if (members[i] == usersInfoArray[j].sur_name) {
        userCentrums.push(usersInfoArray[j].centrum);
        userClinics.push(usersInfoArray[j].clinic);
      }
    }
  }
  return [userCentrums, userClinics];
}

export function handleKeyPressBulletPoint(
  e: any,
  setter: (value: string) => void,
  currentValue: string
) {
  if (e.key === "Enter") {
    e.preventDefault();
    setter(currentValue + "\n+ ");
  }
}

export function handleFocusBulletPoint(
  currentValue: string,
  setter: (value: string) => void
) {
  if (currentValue === "") {
    setter("+ ");
  }
}

export function handleKeyPressBulletPointGoals(
  e: any,
  setter: (value: string) => void,
  currentValue: string
) {
  if (e.key === "Enter") {
    e.preventDefault();
    setter(currentValue + "\n◯ ");
  }
}

export function handleFocusBulletPointGoals(
  currentValue: string,
  setter: (value: string) => void
) {
  if (currentValue === "") {
    setter("◯ ");
  }
}

export function transformBulletPoints(value: string) {
  // Split the value by newline characters to get an array of lines
  let lines = value.split("\n");

  // Remove the bullet points from each line
  lines = lines.map((line) => line.replace("+ ", ""));
  lines = lines.map((line) => line.replace("◯ ", ""));
  lines = lines.map((line) => line.replace("+", ""));
  lines = lines.map((line) => line.replace("◯", ""));

  // Remove any empty lines
  lines = lines.filter((line) => line !== "");

  return lines;
}
