export const getGoalPriority = (important, urgent) => {
  if (important) {
    if (urgent) {
      return 1;
    } else {
      return 3;
    }
  } else {
    if (urgent) {
      return 2;
    } else {
      return 4;
    }
  }
};

export const getImpUrgent = (priority) => {
  switch (priority) {
    case 1:
      return { important: true, urgent: true };
    case 2:
      return { important: false, urgent: true };
    case 3:
      return { important: true, urgent: false };
    case 4:
    default:
      return { important: false, urgent: false };
  }
};
