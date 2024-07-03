import cronParser from 'cron-parser';

export const getNextCronExecution = (cronExpression: string): Date | null => {
  try {
    const cronInterval = cronParser.parseExpression(cronExpression);
    return cronInterval.next().toDate();
  } catch (error) {
    console.error(`Error parsing cron expression:`);
    return null;
  }
};
