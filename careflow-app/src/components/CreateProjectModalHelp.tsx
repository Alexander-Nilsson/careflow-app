// export handleKeyPressBulletPoint = (
//     e: any,
//     setter: (value: string) => void,
//     currentValue: string
//   ) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       setter(currentValue + "\n+ ");
//     }
//   };

export function handleKeyPressBulletPoint(
    e: any,
    setter: (value: string) => void,
    currentValue: string
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      setter(currentValue + "\n+ ");
    }
};

export function handleFocusBulletPoint(
    currentValue: string,
    setter: (value: string) => void
  ) {
    if (currentValue === "") {
      setter("+ ");
    }
};

export function handleKeyPressBulletPointGoals(
    e: any,
    setter: (value: string) => void,
    currentValue: string
  ){
    if (e.key === "Enter") {
      e.preventDefault();
      setter(currentValue + "\n◯ ");
    }
  };

export function handleFocusBulletPointGoals(
    currentValue: string,
    setter: (value: string) => void
  ){
    if (currentValue === "") {
      setter("◯ ");
    }
  };

  